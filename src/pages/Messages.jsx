import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import MessageItem from '../components/MessageItem';
import MessageItemSkeleton from '../skeletons/MessageItemSkeleton';

import { db, auth } from '../firebase.config';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [snapshot, loading, error] = useCollection(
    query(
      collection(db, 'messages'),
      where('sentTo', '==', auth.currentUser.uid),
      orderBy('sentAt', 'desc')
    )
  );

  useEffect(() => {
    document.title = 'Messages | Rent or Sell';
  }, []);

  useEffect(() => {
    if (snapshot) {
      const messagesData = [];
      snapshot.forEach((doc) => {
        return messagesData.push({
          docID: doc.id,
          data: doc.data()
        });
      });
      setMessages(messagesData);
    }
  }, [snapshot]);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Messages</h1>
        </div>
        <div className="space-y-6">
          {loading &&
            Array(9)
              .fill()
              .map((item) => <MessageItemSkeleton key={uuidv4()} />)}
          {error && <p>{error.message}</p>}
          {messages.length === 0 && !error ? <p>No messages to show.</p> : null}
          {messages.length > 0 &&
            messages.map(({ docID, data }) => <MessageItem {...data} key={docID} />)}
        </div>
      </section>
    </main>
  );
}

export default Messages;

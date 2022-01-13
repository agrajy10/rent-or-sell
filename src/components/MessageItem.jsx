import { useState } from 'react';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function MessageItem({ sentAt, listingTitle, message }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const msgBtnLabel = isExpanded ? 'Close' : 'View message';

  return (
    <div className="card card-bordered border-gray-200 shadow">
      <div className="card-body p-6">
        <div className="sm:grid sm:grid-cols-[1fr_200px] sm:gap-4 sm:items-center">
          <div>
            <span className="block text-sm text-gray-500 mb-2">
              {formatDistanceToNow(sentAt.toDate(), { addSuffix: true })}
            </span>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">{listingTitle}</h2>
          </div>
          <button
            type="button"
            className="btn btn-primary w-full max-w-[200px]"
            onClick={() => setIsExpanded(!isExpanded)}>
            {msgBtnLabel}
          </button>
        </div>
        {isExpanded && <p className="pt-4">{message}</p>}
      </div>
    </div>
  );
}

export default MessageItem;

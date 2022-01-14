import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function MessageItemSkeleton() {
  return (
    <div className="card card-bordered border-gray-200 shadow">
      <div className="card-body p-6">
        <Skeleton count={3} />
      </div>
    </div>
  );
}

export default MessageItemSkeleton;

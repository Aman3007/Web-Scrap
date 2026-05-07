import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'Nothing here yet', subtitle = '', icon: Icon = Inbox }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
    <div className="w-16 h-16 rounded-2xl bg-surface-700 flex items-center justify-center">
      <Icon size={28} className="text-surface-400" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      {subtitle && <p className="text-surface-300 text-sm max-w-sm">{subtitle}</p>}
    </div>
  </div>
);

export default EmptyState;

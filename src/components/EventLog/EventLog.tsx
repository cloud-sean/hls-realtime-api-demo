import React from 'react';
import './EventLog.scss';

interface EventLogProps {
  events: any[]; // TODO: Define proper type
}

export const EventLog: React.FC<EventLogProps> = ({ events }) => {
  return (
    <div className="events">
      {/* TODO: Implement event log */}
    </div>
  );
};

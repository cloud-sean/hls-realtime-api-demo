import React from 'react';
import './Conversation.scss';

interface ConversationProps {
  messages: any[]; // TODO: Define proper type
}

export const Conversation: React.FC<ConversationProps> = ({ messages }) => {
  return (
    <div className="conversation">
      {/* TODO: Implement conversation view */}
    </div>
  );
};

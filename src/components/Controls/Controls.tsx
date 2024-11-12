import React from 'react';
import { X, Zap } from 'react-feather';
import { Button } from '../button/Button';
import { Toggle } from '../toggle/Toggle';
import './Controls.scss';

interface ControlsProps {
  isConnected: boolean;
  canPushToTalk: boolean;
  isRecording: boolean;
  onTurnEndTypeChange: (enabled: boolean, value: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isConnected,
  canPushToTalk,
  isRecording,
  onTurnEndTypeChange,
  onStartRecording,
  onStopRecording,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="content-actions">
      <Toggle
        defaultValue={false}
        labels={['manual', 'vad']}
        values={['none', 'server_vad']}
        onChange={onTurnEndTypeChange}
      />
      <div className="spacer" />
      {isConnected && canPushToTalk && (
        <Button
          label={isRecording ? 'release to send' : 'push to talk'}
          buttonStyle={isRecording ? 'alert' : 'regular'}
          disabled={!isConnected || !canPushToTalk}
          onMouseDown={onStartRecording}
          onMouseUp={onStopRecording}
        />
      )}
      <div className="spacer" />
      <Button
        label={isConnected ? 'disconnect' : 'connect'}
        iconPosition={isConnected ? 'end' : 'start'}
        icon={isConnected ? X : Zap}
        buttonStyle={isConnected ? 'regular' : 'action'}
        onClick={isConnected ? onDisconnect : onConnect}
      />
    </div>
  );
};

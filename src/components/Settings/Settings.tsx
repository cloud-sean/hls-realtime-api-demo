import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'react-feather';
import { Modal } from '../../components/Modal/Modal';
import './Settings.scss';

interface SettingsProps {
  visibilitySettings: {
    showDialysisCenter: boolean;
    showMemory: boolean;
  };
  onSettingChange: (setting: string, value: boolean) => void;
  instructions: string;
  onInstructionsChange: (newInstructions: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  visibilitySettings,
  onSettingChange,
  instructions,
  onInstructionsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState(instructions);

  const handleSaveInstructions = () => {
    onInstructionsChange(editedInstructions);
    setIsModalOpen(false);
  };

  return (
    <div className="settings-container">
      <button 
        className="settings-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
      >
        <SettingsIcon size={20} />
      </button>
      
      {isOpen && (
        <div className="settings-menu">
          <div className="settings-item">
            <label>
              <input
                type="checkbox"
                checked={visibilitySettings.showDialysisCenter}
                onChange={(e) => onSettingChange('showDialysisCenter', e.target.checked)}
              />
              Show Dialysis Center
            </label>
          </div>
          <div className="settings-item">
            <label>
              <input
                type="checkbox"
                checked={visibilitySettings.showMemory}
                onChange={(e) => onSettingChange('showMemory', e.target.checked)}
              />
              Show Memory
            </label>
          </div>
          <div className="settings-item">
            <button 
              className="edit-instructions-button"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Instructions
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="instructions-editor">
            <h2>Edit Instructions</h2>
            <textarea
              value={editedInstructions}
              onChange={(e) => setEditedInstructions(e.target.value)}
              rows={20}
            />
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleSaveInstructions}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

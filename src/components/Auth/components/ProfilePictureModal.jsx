import React, { useState, useRef } from 'react';
import Modal from '../../common/Modal';
import './ProfilePictureModal.css';

const ProfilePictureModal = ({
  isOpen,
  onClose,
  initialValue,
  colors,
  profileIcons,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('icons');
  const [activeIconCategory, setActiveIconCategory] = useState('people');
  const [selectedIcon, setSelectedIcon] = useState(initialValue.icon || '👤');
  const [selectedColor, setSelectedColor] = useState(initialValue.color || '#5b5ef4');
  const [selectedInitial, setSelectedInitial] = useState(initialValue.initial || 'T');
  const [customImage, setCustomImage] = useState(initialValue.customImage || null);
  const fileInputRef = useRef(null);

  // Categorized icons - derived from the flattened profileIcons if needed
  const iconCategories = {
    people: [
      '👤', '👨', '👩', '👦', '👧', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓',
      '🧑', '🧔', '👱', '👲', '👳', '👮', '👷', '💂', '🕵️', '👨‍⚕️', '👩‍⚕️',
      '👨‍🍳', '👩‍🍳', '👨‍🎨', '👩‍🎨', '👨‍✈️', '👩‍✈️', '🧙', '🦸', '🦹'
    ],
    faces: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃',
      '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
      '🤓', '😎', '🧐', '🤠', '🥳', '😏', '😒', '😔', '😟', '😕', '🙁', '😣',
      '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯'
    ],
    animals: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
      '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦅', '🦉', '🐺', '🐗', '🐴',
      '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂'
    ],
    fantasy: [
      '👻', '👽', '👾', '🤖', '💩', '👹', '👺', '🤡', '💀', '☠️', '👀', '👁️',
      '🧠', '👑', '👒', '🎩', '🎭', '🔮', '🌟', '⭐', '🌈', '🌠', '🚀', '🌞', '🌙'
    ],
    objects: [
      '📱', '💻', '⌚', '📷', '🎮', '🎧', '🎬', '🏆', '🎸', '🎹', '🥁', '🎯',
      '🎨', '🎭', '🎪', '🎟️', '🎫', '🎪', '📚', '💼', '📝', '📅', '🔑', '💡', '📌'
    ]
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleIconCategoryChange = (category) => {
    setActiveIconCategory(category);
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleInitialChange = (e) => {
    // Limit to a single character
    const value = e.target.value.charAt(0).toUpperCase();
    setSelectedInitial(value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    const profileData = {
      type: activeTab,
      icon: selectedIcon,
      color: selectedColor,
      initial: selectedInitial,
      customImage: customImage
    };
    onSave(profileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customize Your Profile Picture"
      size="medium"
    >
      <div className="profile-modal-content">
        <div className="profile-modal-tabs">
          <button
            className={`profile-tab ${activeTab === 'icons' ? 'active' : ''}`}
            onClick={() => handleTabChange('icons')}
          >
            Icons
          </button>
          <button
            className={`profile-tab ${activeTab === 'initials' ? 'active' : ''}`}
            onClick={() => handleTabChange('initials')}
          >
            Initials
          </button>
          <button
            className={`profile-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => handleTabChange('upload')}
          >
            Upload Photo
          </button>
        </div>

        <div className="profile-modal-content">
          <div className="profile-preview-section">
            <h4>Preview</h4>
            <div className="profile-preview" style={{ backgroundColor: selectedColor }}>
              {activeTab === 'icons' && selectedIcon}
              {activeTab === 'initials' && selectedInitial}
              {activeTab === 'upload' && customImage && (
                <img src={customImage} alt="Profile" className="custom-profile-image" />
              )}
            </div>
          </div>

          <div className="profile-options-section">
            {activeTab === 'icons' && (
              <>
                <div className="icon-categories">
                  {Object.keys(iconCategories).map(category => (
                    <button
                      key={category}
                      className={`category-button ${activeIconCategory === category ? 'active' : ''}`}
                      onClick={() => handleIconCategoryChange(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="icon-grid">
                  {iconCategories[activeIconCategory].map((icon, index) => (
                    <button
                      key={index}
                      className={`icon-option ${selectedIcon === icon ? 'selected' : ''}`}
                      onClick={() => handleIconSelect(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'initials' && (
              <div className="initials-input-section">
                <label htmlFor="initialInput">Enter your initial:</label>
                <input
                  id="initialInput"
                  type="text"
                  maxLength="1"
                  value={selectedInitial}
                  onChange={handleInitialChange}
                  className="initial-input"
                />
                <p className="help-text">Just one letter that represents you</p>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="upload-section">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button className="upload-btn" onClick={triggerFileInput}>
                  {customImage ? 'Change Image' : 'Choose Image'}
                </button>
                {customImage ? (
                  <button className="remove-image-btn" onClick={() => setCustomImage(null)}>
                    Remove Image
                  </button>
                ) : (
                  <p className="upload-help-text">Select an image from your device</p>
                )}
              </div>
            )}

            <div className="color-options-section">
              <h4>Background Color</h4>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePictureModal;

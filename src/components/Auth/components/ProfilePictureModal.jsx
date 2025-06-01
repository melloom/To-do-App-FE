import React, { useState, useRef } from 'react';
import Modal from '../../common/Modal';
import './ProfilePictureModal.css';

const ProfilePictureModal = ({
  isOpen,
  onClose,
  initialValue,
  colors,
  profileIcons,
  onSave,
  firstName = '',
  lastName = ''
}) => {
  const [activeTab, setActiveTab] = useState('icons');
  const [activeIconCategory, setActiveIconCategory] = useState('people');
  const [selectedIcon, setSelectedIcon] = useState(initialValue.icon || '👤');
  const [selectedColor, setSelectedColor] = useState(initialValue.color || '#5b5ef4');
  const [selectedInitial, setSelectedInitial] = useState(initialValue.initial || 'T');
  const [customImage, setCustomImage] = useState(initialValue.customImage || null);
  const [uploadError, setUploadError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  
  // Enhanced customization options
  const [textStyle, setTextStyle] = useState(initialValue.textStyle || 'normal');
  const [textColor, setTextColor] = useState(initialValue.textColor || '#ffffff');
  const [borderStyle, setBorderStyle] = useState(initialValue.borderStyle || 'none');
  const [shadowEffect, setShadowEffect] = useState(initialValue.shadowEffect || 'none');
  const [avatarShape, setAvatarShape] = useState(initialValue.avatarShape || 'circle');
  
  // Generate display initials from first and last name
  const getDisplayInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    }
    return selectedInitial.toUpperCase();
  };

  // Expanded categorized icons with many more options
  const iconCategories = {
    people: [
      '👤', '👨', '👩', '👦', '👧', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓',
      '🧑', '🧔', '👱', '👲', '👳', '👮', '👷', '💂', '🕵️', '👨‍⚕️', '👩‍⚕️',
      '👨‍🍳', '👩‍🍳', '👨‍🎨', '👩‍🎨', '👨‍✈️', '👩‍✈️', '🧙', '🦸', '🦹',
      '👨‍🚀', '👩‍🚀', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻', '👨‍🎤', '👩‍🎤', '🧝', '🧛',
      '🧟', '👺', '👹', '🤖', '👽', '👾', '💀', '☠️', '🎅', '🤶'
    ],
    faces: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃',
      '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
      '🤓', '😎', '🧐', '🤠', '🥳', '😏', '😒', '😔', '😟', '😕', '🙁', '😣',
      '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯',
      '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫',
      '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲'
    ],
    animals: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
      '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦅', '🦉', '🐺', '🐗', '🐴',
      '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂',
      '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠',
      '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘',
      '🦏', '🦛', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏'
    ],
    fantasy: [
      '🦄', '🐉', '🧚', '🧞', '🧜', '🧝', '🧙', '🧛', '🧟', '👻', '👽', '👾', '🤖', 
      '💩', '👹', '👺', '🤡', '💀', '☠️', '👀', '👁️', '🧠', '👑', '💎', '🔮',
      '🌟', '⭐', '🌈', '🌠', '🚀', '🌞', '🌙', '⚡', '❄️', '🔥', '💧', '🌊',
      '🍄', '🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '🌱', '🌿', '☘️', '🍀', '🎋'
    ],
    objects: [
      '📱', '💻', '⌚', '📷', '🎮', '🎧', '🎬', '🏆', '🎸', '🎹', '🥁', '🎯',
      '🎨', '🎭', '🎪', '🎟️', '🎫', '🎪', '📚', '💼', '📝', '📅', '🔑', '💡', '📌',
      '✂️', '📐', '📏', '📎', '🖇️', '📋', '📃', '📄', '📊', '📈', '📉', '🗂️',
      '🗃️', '🗄️', '🗞️', '📰', '📑', '🔖', '🏷️', '💰', '💴', '💵', '💶', '💷'
    ],
    food: [
      '🍎', '🍏', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑',
      '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑',
      '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳',
      '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪'
    ],
    activities: [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓',
      '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿',
      '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️',
      '🤸', '🤾', '🏌️', '🏇', '🧘', '🏃', '🚶', '🧗', '🤺', '🏊', '🚣', '🧜'
    ],
    nature: [
      '🌲', '🌳', '🌴', '🌵', '🌶️', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃',
      '🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '💐', '🌱', '🌰', '🎋', '🎍', '🌀',
      '🌊', '🌈', '☀️', '🌤️', '⛅', '🌦️', '🌧️', '⛈️', '🌩️', '❄️', '☃️', '⛄',
      '🔥', '💧', '🌟', '⭐', '🌠', '☄️', '🌙', '🌛', '🌜', '🌚', '🌕', '🌖'
    ],
    symbols: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕',
      '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️',
      '✡️', '🔯', '🕎', '☯️', '☦️', '⛎', '♈', '♉', '♊', '♋', '♌', '♍',
      '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚡', '🌟', '💫', '✨', '💥'
    ]
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear upload error when switching tabs
    if (tab !== 'upload') {
      setUploadError(null);
    }
    // Reset file input when switching away from upload tab
    if (fileInputRef.current && tab !== 'upload') {
      fileInputRef.current.value = '';
    }
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
    // Allow up to 2 characters
    const value = e.target.value.slice(0, 2).toUpperCase();
    setSelectedInitial(value);
  };

  // Enhanced customization handlers
  const handleTextStyleChange = (style) => {
    setTextStyle(style);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
  };

  const handleBorderStyleChange = (style) => {
    setBorderStyle(style);
  };

  const handleShadowEffectChange = (effect) => {
    setShadowEffect(effect);
  };

  const handleAvatarShapeChange = (shape) => {
    setAvatarShape(shape);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    setUploadError(null); // Clear any previous errors
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, GIF).');
      return;
    }
    
    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size too large. Please select an image smaller than 5MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomImage(event.target.result);
      setActiveTab('upload'); // Switch to upload tab to show the uploaded image
      setUploadError(null); // Clear errors on successful upload
    };
    reader.onerror = () => {
      setUploadError('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveImage = () => {
    setCustomImage(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    const profileData = {
      type: activeTab,
      icon: selectedIcon,
      color: selectedColor,
      initial: firstName && lastName ? getDisplayInitials() : selectedInitial,
      customImage: customImage,
      textStyle: textStyle,
      textColor: textColor,
      borderStyle: borderStyle,
      shadowEffect: shadowEffect,
      avatarShape: avatarShape
    };
    onSave(profileData);
    onClose();
  };

  const renderUploadContent = () => (
    <div className="upload-section">
      {/* Upload Area */}
      <div
        className={`upload-drop-zone ${isDragOver ? 'drag-over' : ''} ${customImage ? 'has-image' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">
          {customImage ? '🖼️' : '📸'}
        </div>
        <p>
          <strong>{customImage ? 'Click to change' : 'Click to upload'}</strong> or drag and drop
        </p>
        <p className="upload-help-text">PNG, JPG, GIF up to 5MB</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div className="upload-actions">
        <button
          type="button"
          className="upload-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          {customImage ? 'Change Photo' : 'Choose Photo'}
        </button>

        {customImage && (
          <button
            type="button"
            className="remove-image-btn"
            onClick={handleRemoveImage}
          >
            Remove Photo
          </button>
        )}
      </div>

      {uploadError && (
        <div className="upload-error">
          <span className="error-icon">⚠️</span>
          {uploadError}
        </div>
      )}

      {customImage && (
        <div className="upload-success">
          <span className="success-icon">✅</span>
          Image uploaded successfully! You can continue with this image or upload a different one.
        </div>
      )}
    </div>
  );

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
          <button
            className={`profile-tab ${activeTab === 'styles' ? 'active' : ''}`}
            onClick={() => handleTabChange('styles')}
          >
            Styles
          </button>
        </div>

        <div className="profile-modal-content">
          <div className="profile-preview-section">
            <h4>Preview</h4>
            <div 
              className={`profile-preview ${avatarShape}`} 
              style={{ 
                backgroundColor: selectedColor,
                color: textColor,
                fontWeight: textStyle === 'bold' ? 'bold' : 'normal',
                fontStyle: textStyle === 'italic' ? 'italic' : 'normal',
                fontFamily: textStyle === 'fancy' ? '"Comic Sans MS", cursive' : 'inherit',
                border: borderStyle === 'solid' ? '3px solid #333' : 
                        borderStyle === 'dashed' ? '3px dashed #333' : 
                        borderStyle === 'gradient' ? '3px solid transparent' : 'none',
                backgroundImage: borderStyle === 'gradient' ? `linear-gradient(45deg, ${selectedColor}, ${textColor})` : 'none',
                backgroundClip: borderStyle === 'gradient' ? 'border-box' : 'initial',
                boxShadow: shadowEffect === 'soft' ? '0 2px 8px rgba(0,0,0,0.2)' :
                          shadowEffect === 'hard' ? '0 4px 12px rgba(0,0,0,0.4)' :
                          shadowEffect === 'glow' ? `0 0 20px ${textColor}` : 'none'
              }}
            >
              {activeTab === 'icons' && selectedIcon}
              {activeTab === 'initials' && getDisplayInitials()}
              {activeTab === 'upload' && customImage && (
                <img src={customImage} alt="Profile" className="custom-profile-image" />
              )}
              {activeTab === 'upload' && !customImage && (
                <span style={{ fontSize: '2rem', opacity: 0.5 }}>📸</span>
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
                {firstName && lastName ? (
                  <div className="auto-initials-display">
                    <label>Your initials:</label>
                    <div className="initials-display">
                      <span className="initial-letter">{firstName.charAt(0).toUpperCase()}</span>
                      <span className="initial-letter">{lastName.charAt(0).toUpperCase()}</span>
                    </div>
                    <p className="help-text">Based on your first and last name</p>
                  </div>
                ) : (
                  <div className="manual-initials-input">
                    <label htmlFor="initialInput">Enter your initial:</label>
                    <input
                      id="initialInput"
                      type="text"
                      maxLength="2"
                      value={selectedInitial}
                      onChange={handleInitialChange}
                      className="initial-input"
                      placeholder="AB"
                    />
                    <p className="help-text">Enter 1-2 letters that represent you</p>
                  </div>
                )}
                
                <div className="initials-text-style-section">
                  <h4>Text Style</h4>
                  <div className="style-options">
                    {['normal', 'bold', 'italic', 'fancy'].map(style => (
                      <button
                        key={style}
                        className={`style-option ${textStyle === style ? 'selected' : ''}`}
                        onClick={() => handleTextStyleChange(style)}
                      >
                        <span 
                          style={{
                            fontWeight: style === 'bold' ? 'bold' : 'normal',
                            fontStyle: style === 'italic' ? 'italic' : 'normal',
                            fontFamily: style === 'fancy' ? '"Comic Sans MS", cursive' : 'inherit'
                          }}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="initials-color-section">
                  <h4>Text Color</h4>
                  <div className="color-options">
                    {['#ffffff', '#000000', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280', '#f97316'].map(color => (
                      <button
                        key={color}
                        className={`color-option ${textColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleTextColorChange(color)}
                        title={`Select ${color}`}
                      />
                    ))}
                  </div>
                  <div className="custom-color-picker">
                    <label htmlFor="customTextColor">Custom Color:</label>
                    <input
                      id="customTextColor"
                      type="color"
                      value={textColor}
                      onChange={(e) => handleTextColorChange(e.target.value)}
                      className="color-picker-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upload' && renderUploadContent()}

            {activeTab === 'styles' && (
              <div className="styles-section">
                <div className="style-group">
                  <h4>Avatar Shape</h4>
                  <div className="shape-options">
                    {[
                      { value: 'circle', label: '● Circle' },
                      { value: 'square', label: '■ Square' },
                      { value: 'rounded', label: '▢ Rounded' },
                      { value: 'hexagon', label: '⬡ Hexagon' }
                    ].map(shape => (
                      <button
                        key={shape.value}
                        className={`shape-option ${avatarShape === shape.value ? 'selected' : ''}`}
                        onClick={() => handleAvatarShapeChange(shape.value)}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="style-group">
                  <h4>Border Style</h4>
                  <div className="border-options">
                    {[
                      { value: 'none', label: 'None' },
                      { value: 'solid', label: 'Solid' },
                      { value: 'dashed', label: 'Dashed' },
                      { value: 'gradient', label: 'Gradient' }
                    ].map(border => (
                      <button
                        key={border.value}
                        className={`border-option ${borderStyle === border.value ? 'selected' : ''}`}
                        onClick={() => handleBorderStyleChange(border.value)}
                      >
                        {border.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="style-group">
                  <h4>Shadow Effect</h4>
                  <div className="shadow-options">
                    {[
                      { value: 'none', label: 'None' },
                      { value: 'soft', label: 'Soft' },
                      { value: 'hard', label: 'Hard' },
                      { value: 'glow', label: 'Glow' }
                    ].map(shadow => (
                      <button
                        key={shadow.value}
                        className={`shadow-option ${shadowEffect === shadow.value ? 'selected' : ''}`}
                        onClick={() => handleShadowEffectChange(shadow.value)}
                      >
                        {shadow.label}
                      </button>
                    ))}
                  </div>
                </div>
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

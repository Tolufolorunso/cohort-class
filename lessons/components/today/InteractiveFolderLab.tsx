'use client';

import React, { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  parentId: string | null;
  content?: string;
}

export function InteractiveFolderLab() {
  const [items, setItems] = useState<FileItem[]>([
    { id: 'f-1', name: 'My School Work', type: 'folder', parentId: null },
    { id: 'f-2', name: 'timetable.txt', type: 'file', parentId: null, content: 'Monday: Computer Science\nTuesday: Mathematics' },
  ]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [message, setMessage] = useState('Right-click in the empty space or click "+ New Folder" to create your folder!');
  const [showContextMenu, setShowContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [recycleBinCount, setRecycleBinCount] = useState(0);

  const currentFolder = items.find((i) => i.id === currentFolderId);
  const currentItems = items.filter((i) => i.parentId === currentFolderId);

  const handleCreateFolder = () => {
    const newId = `folder-${Date.now()}`;
    const newItem: FileItem = {
      id: newId,
      name: 'New Folder',
      type: 'folder',
      parentId: currentFolderId,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newId);
    setEditingItemId(newId);
    setTempName('New Folder');
    setShowContextMenu(null);
    setMessage('📁 New folder created! Now type a name for it (like "Computer Class") and press Enter.');
  };

  const handleCreateFile = () => {
    const newId = `file-${Date.now()}`;
    const newItem: FileItem = {
      id: newId,
      name: 'notes.txt',
      type: 'file',
      parentId: currentFolderId,
      content: 'This is my first computer note!',
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newId);
    setEditingItemId(newId);
    setTempName('notes.txt');
    setShowContextMenu(null);
    setMessage('📄 New file created! Type a name for your file and press Enter.');
  };

  const handleSaveRename = (id: string) => {
    if (!tempName.trim()) {
      setEditingItemId(null);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: tempName.trim() } : item))
    );
    setEditingItemId(null);
    setMessage(`✅ Renamed successfully to "${tempName.trim()}"!`);
  };

  const handleDeleteItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target) return;
    setItems((prev) => prev.filter((i) => i.id !== id && i.parentId !== id));
    setSelectedItemId(null);
    setRecycleBinCount((prev) => prev + 1);
    setMessage(`🗑️ Moved "${target.name}" to the Recycle Bin!`);
  };

  const handleOpenFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setSelectedItemId(null);
    setShowContextMenu(null);
    const target = items.find((i) => i.id === folderId);
    setMessage(`📂 Inside "${target?.name}". You can create files or more folders here!`);
  };

  const handleBackToDesktop = () => {
    setCurrentFolderId(null);
    setSelectedItemId(null);
    setShowContextMenu(null);
    setMessage('🖥️ Back on Desktop.');
  };

  const handleCanvasContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setShowContextMenu({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleResetLab = () => {
    setItems([
      { id: 'f-1', name: 'My School Work', type: 'folder', parentId: null },
      { id: 'f-2', name: 'timetable.txt', type: 'file', parentId: null, content: 'Monday: Computer Science\nTuesday: Mathematics' },
    ]);
    setCurrentFolderId(null);
    setSelectedItemId(null);
    setEditingItemId(null);
    setRecycleBinCount(0);
    setMessage('Lab reset to initial desktop view.');
  };

  return (
    <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col gap-4">
      {/* Header and Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
            Desktop Simulator
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            Create Folders & Files Lab
          </h4>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {currentFolderId && (
            <button
              onClick={handleBackToDesktop}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <span>⬅ Back to Desktop</span>
            </button>
          )}

          <button
            onClick={handleCreateFolder}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
          >
            <span>📁 + New Folder</span>
          </button>

          <button
            onClick={handleCreateFile}
            className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-zinc-950 text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
          >
            <span>📄 + New File</span>
          </button>

          <button
            onClick={handleResetLab}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-all cursor-pointer"
            title="Reset to fresh desktop"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Tip & Status Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold">💡 Tip:</span>
          <span className="text-zinc-300 font-medium">{message}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-xs">
          <span>Recycle Bin: 🗑️ {recycleBinCount} items</span>
        </div>
      </div>

      {/* Virtual Desktop Canvas */}
      <div
        onContextMenu={handleCanvasContextMenu}
        onClick={() => setShowContextMenu(null)}
        className="min-h-[300px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-5 relative select-none overflow-hidden"
      >
        {/* Breadcrumb Location Bar */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-4 pb-2 border-b border-zinc-800/60">
          <span>Location:</span>
          <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-emerald-400 font-bold">
            {currentFolder ? `Desktop > ${currentFolder.name}` : 'Desktop'}
          </span>
          <span className="text-zinc-600 text-[11px] ml-auto">
            (Right-click anywhere in empty space)
          </span>
        </div>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500">
            <span className="text-4xl mb-2">📂</span>
            <p className="text-sm font-semibold text-zinc-400">This folder is empty</p>
            <p className="text-xs">Click &quot;+ New File&quot; or &quot;+ New Folder&quot; above to put items inside!</p>
          </div>
        )}

        {/* Desktop / Folder Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {currentItems.map((item) => {
            const isSelected = selectedItemId === item.id;
            const isEditing = editingItemId === item.id;

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItemId(item.id);
                  setShowContextMenu(null);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (item.type === 'folder') {
                    handleOpenFolder(item.id);
                  } else {
                    setMessage(`📄 Opened "${item.name}": "${item.content || 'Empty note'}"`);
                  }
                }}
                className={`p-3 rounded-xl flex flex-col items-center gap-1.5 cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500 shadow-md scale-105'
                    : 'bg-zinc-900/60 hover:bg-zinc-800/80 border-transparent hover:border-zinc-700'
                }`}
              >
                <div className="text-4xl relative">
                  {item.type === 'folder' ? '📁' : '📄'}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-zinc-950" />
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={tempName}
                    autoFocus
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRename(item.id);
                      if (e.key === 'Escape') setEditingItemId(null);
                    }}
                    onBlur={() => handleSaveRename(item.id)}
                    className="w-full text-center text-xs bg-zinc-950 border border-emerald-500 rounded px-1 py-0.5 text-white font-semibold focus:outline-none"
                  />
                ) : (
                  <span className="text-xs font-semibold text-center text-zinc-200 line-clamp-2 break-all max-w-[100px]">
                    {item.name}
                  </span>
                )}

                {/* Quick Item Actions when Selected */}
                {isSelected && !isEditing && (
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingItemId(item.id);
                        setTempName(item.name);
                      }}
                      title="Rename"
                      className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-300"
                    >
                      ✏️ Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                      title="Delete"
                      className="px-1.5 py-0.5 rounded bg-red-950/80 hover:bg-red-900 text-[10px] text-red-300 border border-red-800/40"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right-Click Context Menu */}
        {showContextMenu && (
          <div
            style={{ top: `${showContextMenu.y}px`, left: `${showContextMenu.x}px` }}
            className="absolute z-30 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-1.5 w-44 text-xs text-zinc-200 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-1 font-bold text-zinc-400 text-[10px] uppercase border-b border-zinc-800 mb-1">
              Desktop Menu
            </div>
            <button
              onClick={handleCreateFolder}
              className="w-full text-left px-3 py-1.5 rounded hover:bg-emerald-500 hover:text-zinc-950 flex items-center gap-2 font-semibold"
            >
              <span>📁</span>
              <span>New Folder</span>
            </button>
            <button
              onClick={handleCreateFile}
              className="w-full text-left px-3 py-1.5 rounded hover:bg-blue-500 hover:text-zinc-950 flex items-center gap-2 font-semibold"
            >
              <span>📄</span>
              <span>New Text Document</span>
            </button>
            <div className="my-1 border-t border-zinc-800" />
            <button
              onClick={handleResetLab}
              className="w-full text-left px-3 py-1.5 rounded hover:bg-zinc-800 text-zinc-400 flex items-center gap-2 text-[11px]"
            >
              <span>↺</span>
              <span>Refresh Desktop</span>
            </button>
          </div>
        )}
      </div>

      {/* Nigerian Analogy Box */}
      <div className="bg-zinc-950/90 border border-amber-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-300">
          <span className="text-xl">🎒</span>
          <span>
            <strong>Memory Formula:</strong> A <strong>Folder</strong> is like your School Bag (holds many things). A <strong>File</strong> is the homework sheet inside your bag!
          </span>
        </div>
        <span className="text-zinc-500 text-[11px] whitespace-nowrap">
          Shortcut: Press <strong>F2</strong> to rename any item!
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Button from '../common/Button'
import Modal from '../common/Modal'
import BlockEditor from './BlockEditor'

const ItemType = 'CONTENT_BLOCK'

const DraggableBlock = ({ block, index, moveBlock, onEdit, onDelete }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index, id: block.id }
    })

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveBlock(draggedItem.index, index)
                draggedItem.index = index
            }
        }
    })

    const blockTypeLabels = {
        link: 'Link',
        spotlight: 'Spotlight',
        gallery: 'Gallery',
        embed: 'Media'
    }

    const getBlockDisplayTitle = (block) => {
        if (block.title) return block.title
        if (block.type === 'embed') {
            if (block.embedType === 'iframe') return 'Iframe Media'
            return 'URL Media'
        }
        return 'Untitled'
    }

    return (
        <div ref={(node) => ref(drop(node))} className="mb-3">
            <div className="flex items-center justify-between p-4 bg-parchment border border-ink shadow-sharp cursor-move hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all duration-150 ease-mechanical">
                <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-ink font-mono uppercase tracking-wide">
                            {blockTypeLabels[block.type]}
                        </span>
                        <span className="font-serif font-medium text-charcoal">
                            {getBlockDisplayTitle(block)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="small"
                        onClick={() => onEdit(block)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="small"
                        onClick={() => onDelete(block.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

const ContentEditor = ({ blocks = [], onBlocksChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBlock, setEditingBlock] = useState(null)
    const [blockType, setBlockType] = useState('link')

    const moveBlock = (fromIndex, toIndex) => {
        const updatedBlocks = [...blocks]
        const [movedBlock] = updatedBlocks.splice(fromIndex, 1)
        updatedBlocks.splice(toIndex, 0, movedBlock)
        onBlocksChange(updatedBlocks)
    }

    const handleAddBlock = (type) => {
        setBlockType(type)
        setEditingBlock(null)
        setIsModalOpen(true)
    }

    const handleEditBlock = (block) => {
        setEditingBlock(block)
        setBlockType(block.type)
        setIsModalOpen(true)
    }

    const handleSaveBlock = (blockData) => {
        if (editingBlock) {
            // Edit existing block
            const updatedBlocks = blocks.map(block =>
                block.id === editingBlock.id ? { ...blockData, id: editingBlock.id } : block
            )
            onBlocksChange(updatedBlocks)
        } else {
            // Add new block
            const newBlock = {
                ...blockData,
                id: Date.now().toString(),
                type: blockType
            }
            onBlocksChange([...blocks, newBlock])
        }

        setIsModalOpen(false)
        setEditingBlock(null)
    }

    const handleDeleteBlock = (blockId) => {
        if (window.confirm('Are you sure you want to delete this block?')) {
            const updatedBlocks = blocks.filter(block => block.id !== blockId)
            onBlocksChange(updatedBlocks)
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif font-semibold text-charcoal">Content Blocks</h2>

                    <div className="flex space-x-2">
                        <Button onClick={() => handleAddBlock('link')}>
                            Add Link
                        </Button>
                        <Button onClick={() => handleAddBlock('spotlight')}>
                            Add Spotlight
                        </Button>
                        <Button onClick={() => handleAddBlock('gallery')}>
                            Add Gallery
                        </Button>
                        <Button onClick={() => handleAddBlock('embed')}>
                            Add Media
                        </Button>
                    </div>
                </div>

                {blocks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-ink font-mono mb-4">No content blocks yet.</p>
                        <p className="text-gray-400 text-sm">Add your first block using the buttons above.</p>
                    </div>
                ) : (
                    <div>
                        {blocks.map((block, index) => (
                            <DraggableBlock
                                key={block.id}
                                block={block}
                                index={index}
                                moveBlock={moveBlock}
                                onEdit={handleEditBlock}
                                onDelete={handleDeleteBlock}
                            />
                        ))}
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingBlock ? `Edit ${blockType} Block` : `Add ${blockType} Block`}
                    size="large"
                >
                    <BlockEditor
                        type={blockType}
                        initialData={editingBlock}
                        onSave={handleSaveBlock}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </Modal>
            </div>
        </DndProvider>
    )
}

export default ContentEditor
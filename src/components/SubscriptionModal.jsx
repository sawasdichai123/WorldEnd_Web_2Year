import { motion } from 'framer-motion'
import { members } from '../data'
import './SubscriptionModal.css'

const SubscriptionModal = ({ onClose }) => {
    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="modal-header">
                    <h2>Subscribe to our Members</h2>
                    <button className="close-modal-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="channels-grid">
                    {members.map((member) => (
                        <a
                            key={member.id}
                            href={`https://www.youtube.com/channel/${member.channelId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="channel-card"
                            style={{ '--hover-color': member.themeColor }}
                        >
                            <div className="channel-avatar">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <div className="channel-info">
                                <h3 style={{ color: member.themeColor }}>{member.name}</h3>
                                <span className="channel-role">{member.role}</span>
                            </div>
                            <div className="channel-action">
                                <span className="sub-btn">Subscribe</span>
                            </div>
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default SubscriptionModal

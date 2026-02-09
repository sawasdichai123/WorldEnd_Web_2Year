import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FallingParticles from './FallingParticles'
import { members } from './data'
import { fetchMemberStats } from './utils/youtube'
import './CharacterShowcase.css'


/* CountUp Animation Component */
const CountUp = ({ end, duration = 1500 }) => {
    const [count, setCount] = useState(0)

    // Parse number (handle "1,234,567" or "1.2M")
    const numericStr = end.toString().replace(/[^0-9.]/g, '')
    const numericValue = numericStr ? parseFloat(numericStr) : 0

    const hasSuffix = /[KM]/.test(end.toString())
    const suffix = hasSuffix ? end.toString().replace(/[0-9.,]/g, '') : ''

    const decimalMatch = end.toString().split('.')[1]
    const decimals = decimalMatch ? decimalMatch.replace(/[^0-9]/g, '').length : 0

    useEffect(() => {
        let startTime
        let animationFrame

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = currentTime - startTime

            if (progress < duration) {
                const ease = 1 - Math.pow(1 - (progress / duration), 4)
                setCount(numericValue * ease)
                animationFrame = requestAnimationFrame(animate)
            } else {
                setCount(numericValue)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [end, numericValue, duration])

    return (
        <span>
            {hasSuffix
                ? count.toFixed(decimals) + suffix
                : Math.floor(count).toLocaleString()}
        </span>
    )
}

const CharacterShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [realTimeStats, setRealTimeStats] = useState(null)
    const [selectedMember, setSelectedMember] = useState(null)

    const activeMember = members[activeIndex]

    // Preload Images
    useEffect(() => {
        members.forEach(member => {
            const img = new Image()
            img.src = member.image
        })
    }, [])

    // Fetch YouTube Stats
    useEffect(() => {
        let isMounted = true;
        const getStats = async () => {
            const memberToFetch = selectedMember || activeMember
            if (memberToFetch.channelId) {
                const stats = await fetchMemberStats(memberToFetch.channelId);
                if (isMounted && stats) setRealTimeStats(stats);
            } else {
                if (isMounted) setRealTimeStats(null);
            }
        };
        getStats();
        return () => { isMounted = false; };
    }, [activeIndex, activeMember, selectedMember]);

    const currentStats = realTimeStats || (selectedMember ? selectedMember.stats : activeMember.stats);

    const changeMember = (newIndex) => {
        setActiveIndex(newIndex)
    }

    const nextMember = () => changeMember((activeIndex + 1) % members.length)
    const prevMember = () => changeMember((activeIndex - 1 + members.length) % members.length)

    return (
        <div className="showcase-scroll-container">
            <section className="showcase-section">
                <div className="showcase-background">
                    <FallingParticles color={selectedMember ? selectedMember.particleColor : activeMember.particleColor} />
                </div>

                <div className="showcase-content container">
                    <AnimatePresence mode="wait">
                        {!selectedMember ? (
                            /* CAROUSEL VIEW */
                            <motion.div
                                className="showcase-view"
                                key="carousel"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="giant-text-container">
                                    <h1 className="giant-text" style={{
                                        color: 'transparent',
                                        WebkitTextStroke: `2px ${activeMember.themeColor}20`
                                    }}>
                                        {activeMember.name}
                                    </h1>
                                </div>

                                <div className="showcase-grid">
                                    <AnimatePresence mode="wait">
                                        <div className="character-stage" key={activeMember.id}>
                                            <div className="character-img-container" onClick={() => setSelectedMember(activeMember)} style={{ cursor: 'pointer' }}>
                                                <motion.img
                                                    layoutId={`image-${activeMember.id}`}
                                                    src={activeMember.image}
                                                    alt={activeMember.name}
                                                    className="character-full-img"
                                                    initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                                                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, scale: 1.05, y: -20, filter: 'blur(10px)' }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                                                />
                                                <motion.div
                                                    className="click-hint"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileHover={{ opacity: 1, y: 0 }}
                                                    style={{
                                                        position: 'absolute', bottom: '20px', left: '50%', translateX: '-50%',
                                                        color: 'white', background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '20px',
                                                        fontSize: '0.8rem', pointerEvents: 'none'
                                                    }}
                                                >
                                                    Click for Details
                                                </motion.div>
                                            </div>
                                        </div>
                                    </AnimatePresence>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            className="info-panel"
                                            key={activeMember.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <div className="info-header" style={{ color: activeMember.themeColor }}>
                                                <motion.h2 layoutId={`title-${activeMember.id}`} style={{ textShadow: `0 0 30px ${activeMember.themeColor}50` }}>
                                                    {activeMember.name}
                                                </motion.h2>
                                                <span className="role-badge" style={{ borderColor: activeMember.themeColor, color: activeMember.themeColor }}>
                                                    {activeMember.role}
                                                </span>
                                            </div>

                                            <p className="description">{activeMember.description}</p>

                                            <div className="stats-box" style={{ '--theme-color': activeMember.themeColor, borderColor: `${activeMember.themeColor}40` }}>
                                                <div className="stat-row">
                                                    <span className="stat-value"><CountUp key={activeMember.id + 'subs'} end={currentStats.subscribers} /></span>
                                                    <span className="stat-label">Subscribers</span>
                                                </div>
                                                <div className="stat-row">
                                                    <span className="stat-value"><CountUp key={activeMember.id + 'views'} end={currentStats.views} /></span>
                                                    <span className="stat-label">Total Views</span>
                                                </div>
                                                <a href={`https://www.youtube.com/channel/${activeMember.channelId}`} target="_blank" rel="noopener noreferrer" className="yt-button"
                                                    style={{ backgroundColor: activeMember.themeColor, boxShadow: `0 10px 20px -5px ${activeMember.themeColor}60` }}
                                                >
                                                    Subscribe
                                                </a>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="nav-controls">
                                    <button onClick={prevMember} className="nav-btn">←</button>
                                    <div className="dots">
                                        {members.map((member, i) => (
                                            <button key={i} className={`dot ${i === activeIndex ? 'active' : ''}`} onClick={() => changeMember(i)}
                                                style={{ backgroundColor: i === activeIndex ? member.themeColor : '', boxShadow: i === activeIndex ? `0 0 10px ${member.themeColor}` : '' }}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={nextMember} className="nav-btn">→</button>
                                </div>
                            </motion.div>
                        ) : (
                            /* DETAIL VIEW */
                            <motion.div
                                className="detail-view"
                                key="detail"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    position: 'absolute', inset: 0, zIndex: 100,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `radial-gradient(circle at 30% 50%, ${selectedMember.themeColor}20, transparent 70%)`
                                }}
                            >
                                <button className="close-btn" onClick={() => setSelectedMember(null)} style={{
                                    position: 'fixed', top: '3rem', right: '3rem', zIndex: 110,
                                    background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.3)', color: 'white',
                                    width: '60px', height: '60px', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'
                                }}>×</button>

                                <div className="detail-content container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', height: '80vh', alignItems: 'center' }}>
                                    <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <motion.img
                                            layoutId={`image-${selectedMember.id}`}
                                            src={selectedMember.image}
                                            alt={selectedMember.name}
                                            style={{ width: 'auto', maxWidth: '100%', height: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.5))' }}
                                        />
                                    </div>

                                    <motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        style={{ color: 'white' }}
                                    >
                                        <motion.h1 layoutId={`title-${selectedMember.id}`} style={{
                                            fontSize: '5rem', fontWeight: 900, lineHeight: 1,
                                            color: selectedMember.themeColor, textShadow: `0 0 40px ${selectedMember.themeColor}60`
                                        }}>
                                            {selectedMember.name}
                                        </motion.h1>
                                        <h3 style={{ fontSize: '1.5rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '2rem', opacity: 0.8 }}>{selectedMember.role}</h3>

                                        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Height</div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedMember.profile?.height}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Birthday</div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedMember.profile?.birthday}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Illustrator</div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedMember.profile?.illustrator}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Hashtags</div>
                                                <div style={{ fontSize: '0.9rem', color: selectedMember.themeColor }}>
                                                    {selectedMember.profile?.hashtags?.join(' ')}
                                                </div>
                                            </div>
                                        </div>

                                        <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2rem', borderLeft: `3px solid ${selectedMember.themeColor}`, paddingLeft: '1.5rem' }}>
                                            {selectedMember.profile?.background || selectedMember.description}
                                        </p>

                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <a href={`https://www.youtube.com/channel/${selectedMember.channelId}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: selectedMember.themeColor, border: 'none' }}>
                                                Visit Channel
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    )
}

export default CharacterShowcase

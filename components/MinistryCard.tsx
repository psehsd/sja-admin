import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MinistrySectionData } from '../types';
import { generateMinistryImage } from '../services/geminiService';

interface MinistryCardProps {
  data: MinistrySectionData;
  index: number;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ data, index }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isReverse = index % 2 !== 0;
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    let isMounted = true;
    
    const fetchImage = async () => {
      if (isInView && !imageUrl && !loading) {
        // If there is no image prompt, use the fallback image immediately (static mode)
        if (!data.imagePrompt) {
             setImageUrl(data.fallbackImage);
             return;
        }

        setLoading(true);
        const generated = await generateMinistryImage(data.imagePrompt);
        if (isMounted) {
          if (generated) {
            setImageUrl(generated);
          } else {
            // Use the specific fallback image instead of a random one
            setImageUrl(data.fallbackImage);
          }
          setLoading(false);
        }
      }
    };

    if (isInView) {
        fetchImage();
    }

    return () => { isMounted = false; };
  }, [isInView, data.imagePrompt, index, imageUrl, loading, data.fallbackImage]);


  return (
    <section 
        id={data.id}
        ref={ref}
        className={`w-full min-h-[85vh] flex items-center py-32 px-6 lg:px-12 transition-colors duration-700 ease-in-out ${
            index % 2 === 0 
            ? 'bg-transparent' 
            : 'bg-gradient-to-br from-orange-50/50 via-white/30 to-rose-50/40'
        }`}
    >
      <div className={`max-w-7xl mx-auto flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center w-full`}>
        
        {/* Text Content */}
        <motion.div 
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/60 border border-white/50 backdrop-blur-sm shadow-sm">
            <span className="text-brand-purple font-bold text-xs tracking-widest uppercase">
              {data.subtitle}
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-6 leading-tight tracking-tight pb-2 drop-shadow-sm filter">
            {data.title}
          </h2>
          
          <p 
            className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8 font-normal mix-blend-hard-light whitespace-pre-line text-left"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          
          <div className="space-y-4 pt-4">
            {data.details.map((detail, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                className="flex items-center p-4 rounded-xl bg-white/40 border border-white/50 backdrop-blur-md shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 group cursor-default"
              >
                <div className="flex-shrink-0 mr-4 transition-transform group-hover:scale-110 duration-300">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                        <circle cx="14" cy="14" r="14" fill={`url(#grad-${index}-${i})`} />
                        <path d="M8 14L12 18L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id={`grad-${index}-${i}`} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#a78bfa" />
                                <stop offset="1" stopColor="#302b63" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span className="text-gray-800 font-medium text-base group-hover:text-gray-900 transition-colors">{detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Content - Glassmorphism Style with Motion Effects */}
        <motion.div 
          className="flex-1 w-full"
          style={{ perspective: '1000px' }}
          initial={{ opacity: 0, scale: 0.9, rotateY: isReverse ? -15 : 15 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-200/20 border border-white/60 bg-white/40 backdrop-blur-sm aspect-[4/3] group">
                {loading && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md animate-pulse flex items-center justify-center z-20">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-brand-highlight border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-brand-purple/70 text-sm font-medium">Generating Visual...</span>
                        </div>
                    </div>
                )}
                
                {imageUrl ? (
                    <motion.img 
                        src={imageUrl} 
                        alt={data.title} 
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                    />
                ) : (
                    <div className="w-full h-full bg-white/30 flex items-center justify-center">
                        {!loading && <span className="text-gray-500">Waiting for generation...</span>}
                    </div>
                )}
                
                {/* Glass shine effect over image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
              </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default MinistryCard;
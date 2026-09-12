import React from 'react';

export interface ImageMetadataLike {
  src: string;
  width?: number;
  height?: number;
  format?: string;
}

export interface FigureProps {
  src: string | ImageMetadataLike;
  alt: string;
  caption?: string;
  layout?: 'standard' | 'wide' | 'full';
  aspectRatio?: '16/9' | '4/3' | '3/2' | '21/9' | 'auto';
  credit?: string;
}

export const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  caption,
  layout = 'standard',
  aspectRatio = '16/9',
  credit,
}) => {
  const isObj = typeof src === 'object' && src !== null;
  const imageSrc = isObj ? src.src : src;
  const imageWidth = isObj ? src.width : undefined;
  const imageHeight = isObj ? src.height : undefined;

  const layoutClasses = {
    standard: 'my-10 max-w-3xl mx-auto',
    wide: 'my-14 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-24 max-w-5xl mx-auto',
    full: 'my-16 -mx-4 sm:-mx-12 md:-mx-20 lg:-mx-32 w-[calc(100%+2rem)] sm:w-[calc(100%+6rem)] md:w-[calc(100%+10rem)] lg:w-[calc(100%+16rem)]',
  }[layout];

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '21/9': 'aspect-[21/9]',
    'auto': '',
  }[aspectRatio];

  return (
    <figure className={`group relative block ${layoutClasses}`}>
      <div className={`overflow-hidden rounded-sm bg-[#e8e6e1] transition-all duration-300 ${aspectClass}`}>
        <img
          src={imageSrc}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 px-1 text-xs text-[#737373]">
          {caption && <span className="font-serif italic text-[#525252]">{caption}</span>}
          {credit && <span className="text-[11px] tracking-wider uppercase text-[#a3a3a3]">Photo: {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
};

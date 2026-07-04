import { projects } from "@/data/projects";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDossier({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Helper to render text with redacted blocks
  const renderRedactedText = (text: string) => {
    // Split by bracketed text e.g. [secret phrase]
    const parts = text.split(/(\[[^\]]+\])/g);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            // Remove the brackets for the revealed word
            const secret = part.slice(1, -1);
            return (
              <span 
                key={index} 
                className="inline-block bg-transparent text-red-600 lg:bg-black lg:text-black hover:text-red-600 lg:hover:bg-black/90 transition-all duration-300 px-1 mx-1 cursor-crosshair font-mono font-bold tracking-widest selection:bg-transparent"
                title="CLASSIFIED INFO - HOVER TO REVEAL"
              >
                {secret}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  // Helper to render the red stamp
  const renderApprovalStamp = () => (
    <div className="absolute -bottom-12 md:-bottom-8 -right-8 md:-right-12 z-[100] pointer-events-none rotate-[-12deg] scale-50 md:scale-100">
       <div className="border-[6px] border-red-600 px-8 py-3 bg-transparent flex flex-col items-center justify-center">
         <span className="font-sans font-black text-6xl text-red-600 tracking-tighter uppercase leading-none drop-shadow-md">
           APPROVED
         </span>
         <span className="font-mono text-sm font-bold tracking-[0.4em] text-red-600 mt-2 drop-shadow-md">
           FOR PUBLIC RELEASE
         </span>
       </div>
    </div>
  );

  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <main className="min-h-screen bg-background flex justify-center py-12 md:py-24 px-4 selection:bg-red-600 selection:text-white relative cursor-crosshair">
      
      {/* The Letterhead Memo Wrapper */}
      <div className="w-full max-w-4xl bg-[#faf9f6] dark:bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-8 md:p-16 relative">
        
        {/* Top Header Grid (The Letterhead) */}
        <header className="border-b-[4px] border-black/80 dark:border-white/80 pb-6 mb-12">
          <div className="flex justify-between items-start mb-6">
             <div className="font-mono text-xs md:text-sm font-bold tracking-[0.2em] text-black/60 dark:text-white/60">
               DEPT. OF INTERNAL ARCHIVES
             </div>
             <Link href="/works" className="no-stamp font-mono text-xs font-bold tracking-widest border-b-2 border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white transition-colors uppercase text-black dark:text-white">
               ← CLOSE DOSSIER
             </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t-[2px] border-black/20 dark:border-white/20 pt-6">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-black/40 dark:text-white/40 font-bold uppercase mb-1">DATE</span>
              <span className="font-mono text-sm font-bold text-black dark:text-white">OCTOBER {project.year}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-black/40 dark:text-white/40 font-bold uppercase mb-1">SERIAL</span>
              <span className="font-mono text-sm font-bold text-black dark:text-white">{project.serial}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-black/40 dark:text-white/40 font-bold uppercase mb-1">CLIENT</span>
              <span className="font-mono text-sm font-bold text-black dark:text-white">{project.client}</span>
            </div>
          </div>
        </header>

        {/* Memo Body */}
        <section className="mb-16">
          <h1 className="font-playfair font-black text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter text-black dark:text-white mb-8 leading-none">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-1 md:col-span-4 font-mono text-xs font-bold tracking-[0.1em] text-black/50 dark:text-white/50 leading-relaxed uppercase">
              <p>
                CATEGORY: {project.category}
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-8 space-y-6">
              <p className="font-serif text-xl md:text-2xl text-black dark:text-white leading-relaxed font-semibold">
                {project.brief}
              </p>
              <div className="w-12 h-[4px] bg-red-600 my-6" />
              <p className="font-mono text-sm md:text-base text-black/80 dark:text-white/80 leading-loose">
                {renderRedactedText(project.redactedText)}
              </p>
            </div>
          </div>
        </section>

        {/* Visual Evidence (Primary Image + Stamp conditionally) */}
        <section className="relative mt-24 mb-16 border-[4px] border-black/80 dark:border-white/80 p-4 pb-12 bg-[#f0eee9] dark:bg-[#0a0a0a]">
          <div className="absolute -top-4 left-4 bg-[#faf9f6] dark:bg-[#111] px-4 font-mono text-sm font-bold tracking-[0.2em] text-black dark:text-white">
            [ EXHIBIT A: PRIMARY DOCUMENTATION ]
          </div>
          
          <div className="w-full aspect-video relative overflow-hidden bg-black mt-6">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover lg:grayscale lg:opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </div>

          {!hasGallery && renderApprovalStamp()}
        </section>

        {/* Gallery / Remaining Images */}
        {hasGallery && (
          <section className="space-y-16 mb-16">
            {project.gallery.map((imgUrl, index) => {
              const exhibitLetter = String.fromCharCode(66 + index); // B, C, D...
              const isLast = index === project.gallery.length - 1;
              return (
                <div key={index} className="relative border-[4px] border-black/80 dark:border-white/80 p-4 pb-12 bg-[#f0eee9] dark:bg-[#0a0a0a]">
                  <div className="absolute -top-4 left-4 bg-[#faf9f6] dark:bg-[#111] px-4 font-mono text-sm font-bold tracking-[0.2em] text-black dark:text-white">
                    [ EXHIBIT {exhibitLetter}: SUPPLEMENTARY DATA ]
                  </div>
                  
                  <div className="w-full relative overflow-hidden bg-black mt-6 aspect-video">
                    <img 
                      src={imgUrl} 
                      alt={`${project.title} gallery image ${index + 1}`} 
                      className="w-full h-full object-cover lg:grayscale lg:opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                  
                  {isLast && renderApprovalStamp()}
                </div>
              );
            })}
          </section>
        )}

        {/* Live Link Signature Line */}
        <footer className="mt-24 pt-12 border-t-[4px] border-black/80 dark:border-white/80">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-black/40 dark:text-white/40 uppercase">
                Authorized Access Link
              </span>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="font-mono text-lg md:text-xl font-black text-black dark:text-white hover:text-red-600 transition-colors tracking-tighter underline underline-offset-8 break-all max-w-2xl"
              >
                {project.link.replace(/^https?:\/\//, '')}
              </a>
            </div>

            {/* Fake Barcode Signature */}
            <div className="flex gap-[3px] h-12 w-48 opacity-60">
                <div className="w-2 bg-black dark:bg-white h-full" />
                <div className="w-4 bg-black dark:bg-white h-full" />
                <div className="w-[3px] bg-black dark:bg-white h-full" />
                <div className="w-2 bg-black dark:bg-white h-full" />
                <div className="w-6 bg-black dark:bg-white h-full" />
                <div className="w-[2px] bg-black dark:bg-white h-full" />
                <div className="w-4 bg-black dark:bg-white h-full" />
                <div className="w-[5px] bg-black dark:bg-white h-full" />
                <div className="w-2 bg-black dark:bg-white h-full" />
                <div className="w-[3px] bg-black dark:bg-white h-full" />
                <div className="w-4 bg-black dark:bg-white h-full" />
            </div>
          </div>
        </footer>

      </div>

    </main>
  );
}

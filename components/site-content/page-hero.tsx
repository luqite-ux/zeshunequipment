import Image from 'next/image'

export function PageHero({ values, image }: { values: Record<string, unknown> | null; image?: string }) {
  return <section className="relative bg-foreground py-16 md:py-24 overflow-hidden">
    {image ? <div className="absolute inset-0 opacity-20"><Image src={image} alt="" fill className="object-cover" /></div> : null}
    <div className="container mx-auto px-4 relative"><div className="max-w-3xl">
      <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">{String(values?.eyebrow ?? '')}</span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">{String(values?.title ?? '')}</h1>
      <p className="text-background/80 text-lg leading-relaxed">{String(values?.description ?? '')}</p>
    </div></div>
  </section>
}

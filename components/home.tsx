'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Leaf, GraduationCap, Hammer, MoveUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { CATEGORIES, PRODUCTS } from '@/data/products'
import MotionReveal from '@/components/motion-reveal'
import ProductCard from '@/components/product-card'

const ease = [0.22, 1, 0.36, 1] as const

export default function Home(){
  const featured=PRODUCTS.filter(p=>p.badge).slice(0,4)
  return <div className="overflow-hidden">
    <section className="hero-grid relative min-h-[calc(100vh-110px)] overflow-hidden bg-cream">
      <div className="absolute inset-0 hero-grid-lines opacity-70" />
      <motion.div className="absolute -right-24 top-10 h-[520px] w-[520px] rounded-full bg-sage/10 blur-3xl" animate={{x:[0,-30,0],y:[0,25,0],scale:[1,1.08,1]}} transition={{duration:12,repeat:Infinity,ease:'easeInOut'}} />
      <motion.div className="absolute left-[42%] top-[18%] hidden h-px w-[34vw] origin-left bg-sage/30 lg:block" animate={{scaleX:[0,1,1,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} />
      <div className="container-grid relative grid min-h-[calc(100vh-110px)] items-center py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <div className="relative z-10 max-w-3xl">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,ease}}> <div className="eyebrow mb-6">Furniture · Learning · Kitchen · Play</div></motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,ease,delay:.08}} className="font-display text-6xl leading-[.88] tracking-[-.04em] sm:text-7xl lg:text-[8.4rem]">Wood,<br/><span className="relative inline-block">shaped <em className="text-sage">with</em></span><br/><em className="text-walnut">intention.</em></motion.h1>
          <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.22}} className="mt-8 max-w-xl text-base leading-8 text-walnut/65">Premium wooden pieces for classrooms, considered homes and curious little hands. Built slowly, finished honestly, made to stay.</motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.32}} className="mt-9 flex flex-wrap gap-3"><Link href="/shop" className="btn-primary group">Explore the collection <ArrowRight size={15} className="transition-transform group-hover:translate-x-1"/></Link><Link href="/contact" className="btn-outline">School enquiries</Link></motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.55}} className="mt-14 grid max-w-xl grid-cols-3 border-y border-ink/10 py-5"><div><div className="font-display text-2xl">40+</div><div className="mt-1 text-[8px] tracking-[.2em] uppercase text-sage">Schools served</div></div><div><div className="font-display text-2xl">100%</div><div className="mt-1 text-[8px] tracking-[.2em] uppercase text-sage">Wood-led</div></div><div><div className="font-display text-2xl">01</div><div className="mt-1 text-[8px] tracking-[.2em] uppercase text-sage">Clear standard</div></div></motion.div>
        </div>
        <div className="relative mt-10 lg:mt-0 lg:pl-12">
          <motion.div initial={{opacity:0,scale:.92,rotate:2}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1.2,ease,delay:.18}} className="relative mx-auto aspect-[4/5] max-w-md overflow-visible">
            <div className="absolute -inset-5 border border-walnut/10" />
            <div className="absolute -inset-10 border border-sage/10" />
            <div className="relative h-full w-full overflow-hidden bg-sand p-3 shadow-soft">
              <Image src="/assets/img/desk-chair.jpg" alt="Wooden school furniture" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-cream/10 px-4 py-2 text-[8px] uppercase tracking-[.24em] text-white backdrop-blur">01 / 04 · School</div>
              <div className="absolute bottom-7 left-7 right-7 text-cream"><div className="eyebrow !text-sage2">Made for learning</div><div className="mt-2 font-display text-3xl leading-tight">The classroom,<br/>elevated.</div></div>
            </div>
          </motion.div>
          <motion.div animate={{y:[0,-10,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} className="absolute -bottom-7 -left-2 hidden w-48 border border-walnut/10 bg-paper p-4 shadow-xl sm:block lg:-left-4"><div className="text-[8px] uppercase tracking-[.2em] text-sage">Object 001</div><div className="mt-2 font-display text-lg">Classic Study Desk</div><div className="mt-2 text-xs text-walnut/50">Solid wood · built to last</div><div className="mt-4 flex items-center justify-between"><span className="text-xs">PKR 12,500</span><MoveUpRight size={14}/></div></motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-ink/10 bg-cream/70 backdrop-blur"><motion.div animate={{x:['0%','-50%']}} transition={{duration:24,repeat:Infinity,ease:'linear'}} className="flex w-max gap-12 py-3 text-[8px] uppercase tracking-[.3em] text-walnut/45"><span>Natural materials</span><span>•</span><span>Thoughtful design</span><span>•</span><span>Built for real life</span><span>•</span><span>School & institutional orders</span><span>•</span><span>Natural materials</span><span>•</span><span>Thoughtful design</span><span>•</span><span>Built for real life</span><span>•</span><span>School & institutional orders</span></motion.div></div>
    </section>

    <section className="container-grid py-24 lg:py-32"><div className="mb-12 flex items-end justify-between"><div><div className="eyebrow mb-3">Four collections</div><h2 className="font-display text-4xl sm:text-5xl">Choose your world.</h2></div><Link href="/shop" className="hidden sm:flex items-center gap-2 text-[10px] tracking-[.2em] uppercase hover:text-sage">View all <ArrowUpRight size={14}/></Link></div><MotionReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{CATEGORIES.map((c,i)=><motion.div key={c.name} whileHover={{y:-7}} transition={{duration:.35,ease}}><Link href={`/shop?cat=${encodeURIComponent(c.name)}`} className="group relative block aspect-[3/4] overflow-hidden"><Image src={c.image} alt={c.name} fill className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent"/><div className="absolute right-4 top-4 font-display text-5xl text-white/15">0{i+1}</div><div className="absolute inset-x-0 bottom-0 p-6 text-cream"><div className="font-display text-2xl">{c.name}</div><p className="mt-2 text-sm leading-6 text-cream/65">{c.blurb}</p><div className="mt-4 flex items-center gap-2 text-[9px] tracking-[.22em] uppercase text-sage2">Explore <ArrowRight size={13}/></div></div></Link></motion.div>)}</MotionReveal></section>

    <section className="relative overflow-hidden bg-sand/70 py-24 lg:py-32"><div className="absolute inset-0 fine-grid opacity-40"/><div className="container-grid relative"><div className="mb-12 flex items-end justify-between gap-5"><div><div className="eyebrow mb-3">Curated favourites</div><h2 className="font-display text-4xl sm:text-5xl">Loved by schools & homes.</h2></div><Link href="/shop" className="btn-outline hidden sm:inline-flex">View collection</Link></div><MotionReveal className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">{featured.map(p=><ProductCard key={p.id} p={p}/>)}</MotionReveal></div></section>

    <section className="relative overflow-hidden py-24 lg:py-32"><Image src="/assets/img/dark-walnut.jpg" alt="" fill className="object-cover"/><div className="absolute inset-0 bg-ink/88"/><div className="absolute inset-0 dark-grid opacity-30"/><div className="container-grid relative grid gap-12 md:grid-cols-3 text-cream">{[[Hammer,'Master craftsmanship','Joinery, sanding and finishing are treated as part of the design — not an afterthought.'],[Leaf,'Honestly natural','Responsible materials, considered finishes and fewer disposable things in the home.'],[GraduationCap,'Built for education','Furniture and learning materials designed around real classrooms and real children.']].map(([Icon,title,text],i)=>{const I=Icon as typeof Hammer;return <MotionReveal key={title as string} delay={i*.1}><div className="text-center"><motion.div whileHover={{rotate:8,scale:1.08}} className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-sage text-sage2"><I size={23} strokeWidth={1.4}/></motion.div><h3 className="mt-6 font-display text-2xl">{title as string}</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-cream/60">{text as string}</p></div></MotionReveal>})}</div></section>

    <section className="container-grid py-24 text-center lg:py-32"><div className="eyebrow mb-3">For schools & institutions</div><h2 className="font-display text-4xl sm:text-6xl">A better classroom<br/>starts with the details.</h2><p className="mx-auto mt-6 max-w-xl leading-7 text-walnut/65">Request institutional pricing, custom dimensions, sample pieces or a scheduled delivery plan for your school, nursery or learning centre.</p><Link href="/contact" className="btn-primary mt-8">Request a quote</Link></section>
  </div>
}

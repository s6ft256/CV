import{j as e}from"./index-DDHDjOTf.js";import{r as l}from"./vendor-jVyfcstf.js";function c(s={threshold:.12,rootMargin:"0px 0px -80px 0px"}){const a=l.useRef(null);return l.useEffect(()=>{var n;const r=a.current;if(!r)return;if(typeof window<"u"&&((n=window.matchMedia)==null?void 0:n.call(window,"(prefers-reduced-motion: reduce)").matches)||!("IntersectionObserver"in window)){r.setAttribute("data-revealed","true");return}const t=new IntersectionObserver(d=>{d.forEach(o=>{o.isIntersecting&&(o.target.setAttribute("data-revealed","true"),t.unobserve(o.target))})},s);return t.observe(r),()=>t.disconnect()},[s]),a}function u({id:s,title:a,subtitle:r,children:i,className:t="",gradient:n=!1}){const d=c(),o=c();return e.jsxs("section",{id:s,className:`
        py-20 md:py-28 relative overflow-hidden
        ${n?"bg-gradient-to-b from-transparent via-primary/5 to-transparent":""}
        ${t}
      `,children:[n&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"}),e.jsx("div",{className:"absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"})]}),e.jsxs("div",{className:"container mx-auto max-w-[var(--max-width)] px-4 relative z-10",children:[(a||r)&&e.jsxs("div",{ref:d,className:"reveal mb-16 text-center",children:[a&&e.jsx("h2",{className:"text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text tracking-tight",children:e.jsx("span",{className:"bg-gradient-to-r from-text via-text to-muted bg-clip-text",children:a})}),r&&e.jsx("p",{className:"text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed",children:r}),e.jsxs("div",{className:"flex items-center justify-center gap-2 mt-8",children:[e.jsx("div",{className:"w-12 h-1 bg-gradient-to-r from-transparent to-primary rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-primary rounded-full animate-pulse"}),e.jsx("div",{className:"w-12 h-1 bg-gradient-to-l from-transparent to-primary rounded-full"})]})]}),e.jsx("div",{ref:o,className:"reveal",children:i})]})]})}function p({children:s,className:a="",hover:r=!1,gradient:i=!1,glow:t="blue"}){const n={blue:"hover:shadow-glow",accent:"hover:shadow-glow-accent",none:""};return e.jsxs("div",{className:`
        relative group
        bg-card-bg/80 backdrop-blur-md
        border border-border/50
        rounded-2xl p-6 md:p-8
        transition-all duration-500 ease-out
        ${r?`
          hover:border-primary/30
          hover:-translate-y-2
          hover:shadow-2xl
          ${n[t]}
        `:""}
        ${i?"bg-gradient-to-br from-card-bg to-card-bg/50":""}
        ${a}
      `,children:[r&&e.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),e.jsx("div",{className:"relative z-10",children:s}),t!=="none"&&e.jsx("div",{className:`
          absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-r ${t==="blue"?"from-primary/20 via-transparent to-primary/20":"from-accent/20 via-transparent to-accent/20"}
        `})]})}export{p as C,u as S};

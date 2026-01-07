import{j as e}from"./index-9cuSnIu9.js";function i({id:s,title:a,subtitle:t,children:o,className:r="",gradient:n=!1}){return e.jsxs("section",{id:s,className:`
        py-20 md:py-28 relative overflow-hidden
        ${n?"bg-gradient-to-b from-transparent via-primary/5 to-transparent":""}
        ${r}
      `,children:[n&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"}),e.jsx("div",{className:"absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"})]}),e.jsxs("div",{className:"container mx-auto max-w-[var(--max-width)] px-4 relative z-10",children:[(a||t)&&e.jsxs("div",{className:"mb-16 text-center",children:[a&&e.jsx("h2",{className:"text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text tracking-tight",children:e.jsx("span",{className:"bg-gradient-to-r from-text via-text to-muted bg-clip-text",children:a})}),t&&e.jsx("p",{className:"text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed",children:t}),e.jsxs("div",{className:"flex items-center justify-center gap-2 mt-8",children:[e.jsx("div",{className:"w-12 h-1 bg-gradient-to-r from-transparent to-primary rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-primary rounded-full animate-pulse"}),e.jsx("div",{className:"w-12 h-1 bg-gradient-to-l from-transparent to-primary rounded-full"})]})]}),o]})]})}function d({children:s,className:a="",hover:t=!1,gradient:o=!1,glow:r="blue"}){const n={blue:"hover:shadow-glow",accent:"hover:shadow-glow-accent",none:""};return e.jsxs("div",{className:`
        relative group
        bg-card-bg/80 backdrop-blur-md
        border border-border/50
        rounded-2xl p-6 md:p-8
        transition-all duration-500 ease-out
        ${t?`
          hover:border-primary/30
          hover:-translate-y-2
          hover:shadow-2xl
          ${n[r]}
        `:""}
        ${o?"bg-gradient-to-br from-card-bg to-card-bg/50":""}
        ${a}
      `,children:[t&&e.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),e.jsx("div",{className:"relative z-10",children:s}),r!=="none"&&e.jsx("div",{className:`
          absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-r ${r==="blue"?"from-primary/20 via-transparent to-primary/20":"from-accent/20 via-transparent to-accent/20"}
        `})]})}export{d as C,i as S};

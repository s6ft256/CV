import{j as r}from"./index-RN9ISbg8.js";function d({children:e,className:t="",hover:o=!1,gradient:n=!1,glow:a="blue"}){const i={blue:"hover:shadow-glow",accent:"hover:shadow-glow-accent",none:""};return r.jsxs("div",{className:`
        relative group
        bg-card-bg/80 backdrop-blur-md
        border border-border/50
        rounded-2xl p-6 md:p-8
        transition-all duration-500 ease-out
        ${o?`
          hover:border-primary/30
          hover:-translate-y-2
          hover:shadow-2xl
          ${i[a]}
        `:""}
        ${n?"bg-gradient-to-br from-card-bg to-card-bg/50":""}
        ${t}
      `,children:[o&&r.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),r.jsx("div",{className:"relative z-10",children:e}),a!=="none"&&r.jsx("div",{className:`
          absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-r ${a==="blue"?"from-primary/20 via-transparent to-primary/20":"from-accent/20 via-transparent to-accent/20"}
        `})]})}export{d as C};

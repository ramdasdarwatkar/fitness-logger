import{_ as e,m as t,o as n,r,s as i}from"./index-CtcPduhe.js";import{t as a}from"./PageTransition-oMxCtWyv.js";import{t as o}from"./Skeleton-HsLouRUR.js";var s=t(),c=e(r(),1);const l=async()=>{let{data:e,error:t}=await n.from(`profile`).select(`*`).order(`input_date`,{ascending:!1}).limit(1).single();if(t){if(t.code===`PGRST116`)return null;throw t}return e},u=async e=>{let{data:t,error:r}=await n.from(`profile`).select(`id`).order(`input_date`,{ascending:!1}).limit(1).single();if(r&&r.code!==`PGRST116`)throw r;if(!t){let{error:t}=await n.from(`profile`).insert({...e,input_date:(0,c.default)().format(`YYYY-MM-DD`)});if(t)throw t;return}let{error:i}=await n.from(`profile`).update({...e,input_date:(0,c.default)().format(`YYYY-MM-DD`)}).eq(`id`,t.id);if(i)throw i};var d=e(r(),1),f=i(),p=[{title:`Upper Body`,fields:[{key:`chest`,label:`Chest (cm)`},{key:`shoulder`,label:`Shoulder (cm)`},{key:`left_arm`,label:`Left Arm (cm)`},{key:`right_arm`,label:`Right Arm (cm)`}]},{title:`Lower Body`,fields:[{key:`waist`,label:`Waist (cm)`},{key:`hips`,label:`Hips (cm)`},{key:`left_thigh`,label:`Left Thigh (cm)`},{key:`right_thigh`,label:`Right Thigh (cm)`}]},{title:`Other`,fields:[{key:`neck`,label:`Neck (cm)`},{key:`wrist`,label:`Wrist (cm)`},{key:`head`,label:`Head (cm)`}]}],m=()=>{let[e,t]=(0,s.useState)({}),[n,r]=(0,s.useState)(!0),[i,c]=(0,s.useState)(!1);(0,s.useEffect)(()=>{(async()=>{let e=await l();e&&t(e),r(!1)})()},[]);let m=(e,n)=>{t(t=>({...t,[e]:e===`name`?n:n?Number(n):void 0}))};return n?(0,f.jsx)(a,{children:(0,f.jsxs)(`div`,{className:`p-4 space-y-6`,children:[(0,f.jsx)(o,{className:`h-6 w-40`}),(0,f.jsx)(o,{className:`h-4 w-24`}),(0,f.jsx)(`div`,{className:`grid grid-cols-3 gap-3`,children:Array.from({length:9}).map((e,t)=>(0,f.jsx)(o,{className:`h-10`},t))}),(0,f.jsx)(o,{className:`h-12 w-full`})]})}):(0,f.jsx)(a,{children:(0,f.jsxs)(`div`,{className:`p-4 pb-28 space-y-6`,children:[(0,f.jsxs)(`div`,{className:`space-y-1`,children:[(0,f.jsx)(`input`,{type:`text`,placeholder:`Your name`,value:e.name??``,onChange:e=>m(`name`,e.target.value),className:`\r
            w-full\r
            text-xl\r
            font-semibold\r
            bg-transparent\r
            border-b border-white/10\r
            focus:outline-none\r
            pb-1\r
          `}),(0,f.jsxs)(`p`,{className:`text-xs text-gray-400`,children:[`Profile • `,(0,d.default)().format(`DD MMM YYYY`)]})]}),(0,f.jsxs)(`div`,{className:`space-y-3`,children:[(0,f.jsx)(`h2`,{className:`text-sm font-medium text-gray-400`,children:`Basics`}),(0,f.jsxs)(`div`,{className:`grid grid-cols-3 gap-3`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{className:`text-[11px] text-gray-400`,children:`Height (cm)`}),(0,f.jsx)(`input`,{type:`number`,value:e.height??``,onChange:e=>m(`height`,e.target.value),className:`\r
                w-full\r
                p-2\r
                rounded-lg\r
                bg-surface\r
                text-sm\r
                text-center\r
              `})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{className:`text-[11px] text-gray-400`,children:`Weight (kg)`}),(0,f.jsx)(`input`,{type:`number`,value:e.weight??``,onChange:e=>m(`weight`,e.target.value),className:`\r
                w-full\r
                p-2\r
                rounded-lg\r
                bg-surface\r
                text-sm\r
                text-center\r
              `})]}),(0,f.jsx)(`div`,{})]})]}),p.map(t=>(0,f.jsxs)(`div`,{className:`space-y-3`,children:[(0,f.jsx)(`h2`,{className:`text-sm font-medium text-gray-400`,children:t.title}),(0,f.jsx)(`div`,{className:`grid grid-cols-3 gap-3`,children:t.fields.map(t=>(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{className:`text-[11px] text-gray-400`,children:t.label}),(0,f.jsx)(`input`,{type:`number`,value:e[t.key]??``,onChange:e=>m(t.key,e.target.value),className:`\r
                    w-full\r
                    p-2\r
                    rounded-lg\r
                    bg-surface\r
                    text-sm\r
                    text-center\r
                  `})]},t.key))})]},t.title)),(0,f.jsx)(`div`,{className:`fixed bottom-0 left-0 right-0 p-4 bg-bg`,children:(0,f.jsx)(`button`,{onClick:async()=>{c(!0),await u(e),c(!1)},disabled:i,className:`w-full py-3 rounded-xl bg-primary text-black font-semibold`,children:i?`Saving…`:`Save Profile`})})]})})};export{m as default};
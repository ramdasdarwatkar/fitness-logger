import{_ as e,m as t,o as n,r,s as i}from"./index-CgAkKeju.js";var a=t(),o=e(r(),1);const s=async()=>{let{data:e,error:t}=await n.from(`profile`).select(`*`).order(`input_date`,{ascending:!1}).limit(1).single();if(t){if(t.code===`PGRST116`)return null;throw t}return e},c=async e=>{let{data:t,error:r}=await n.from(`profile`).select(`id`).order(`input_date`,{ascending:!1}).limit(1).single();if(r&&r.code!==`PGRST116`)throw r;if(!t){let{error:t}=await n.from(`profile`).insert({...e,input_date:(0,o.default)().format(`YYYY-MM-DD`)});if(t)throw t;return}let{error:i}=await n.from(`profile`).update({...e,input_date:(0,o.default)().format(`YYYY-MM-DD`)}).eq(`id`,t.id);if(i)throw i};var l=e(r(),1),u=i(),d=[{title:`Upper Body`,fields:[{key:`chest`,label:`Chest (cm)`},{key:`shoulder`,label:`Shoulder (cm)`},{key:`left_arm`,label:`Left Arm (cm)`},{key:`right_arm`,label:`Right Arm (cm)`}]},{title:`Lower Body`,fields:[{key:`waist`,label:`Waist (cm)`},{key:`hips`,label:`Hips (cm)`},{key:`left_thigh`,label:`Left Thigh (cm)`},{key:`right_thigh`,label:`Right Thigh (cm)`}]},{title:`Other`,fields:[{key:`neck`,label:`Neck (cm)`},{key:`wrist`,label:`Wrist (cm)`},{key:`head`,label:`Head (cm)`}]}],f=()=>{let[e,t]=(0,a.useState)({}),[n,r]=(0,a.useState)(!0),[i,o]=(0,a.useState)(!1);(0,a.useEffect)(()=>{(async()=>{let e=await s();e&&t(e),r(!1)})()},[]);let f=(e,n)=>{t(t=>({...t,[e]:e===`name`?n:n?Number(n):void 0}))};return n?null:(0,u.jsxs)(`div`,{className:`p-4 pb-28 space-y-6`,children:[(0,u.jsxs)(`div`,{className:`space-y-1`,children:[(0,u.jsx)(`input`,{type:`text`,placeholder:`Your name`,value:e.name??``,onChange:e=>f(`name`,e.target.value),className:`\r
            w-full\r
            text-xl\r
            font-semibold\r
            bg-transparent\r
            border-b border-white/10\r
            focus:outline-none\r
            pb-1\r
          `}),(0,u.jsxs)(`p`,{className:`text-xs text-gray-400`,children:[`Profile • `,(0,l.default)().format(`DD MMM YYYY`)]})]}),(0,u.jsxs)(`div`,{className:`space-y-3`,children:[(0,u.jsx)(`h2`,{className:`text-sm font-medium text-gray-400`,children:`Basics`}),(0,u.jsxs)(`div`,{className:`grid grid-cols-3 gap-3`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`label`,{className:`text-[11px] text-gray-400`,children:`Height (cm)`}),(0,u.jsx)(`input`,{type:`number`,value:e.height??``,onChange:e=>f(`height`,e.target.value),className:`\r
                w-full\r
                p-2\r
                rounded-lg\r
                bg-surface\r
                text-sm\r
                text-center\r
              `})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`label`,{className:`text-[11px] text-gray-400`,children:`Weight (kg)`}),(0,u.jsx)(`input`,{type:`number`,value:e.weight??``,onChange:e=>f(`weight`,e.target.value),className:`\r
                w-full\r
                p-2\r
                rounded-lg\r
                bg-surface\r
                text-sm\r
                text-center\r
              `})]}),(0,u.jsx)(`div`,{})]})]}),d.map(t=>(0,u.jsxs)(`div`,{className:`space-y-3`,children:[(0,u.jsx)(`h2`,{className:`text-sm font-medium text-gray-400`,children:t.title}),(0,u.jsx)(`div`,{className:`grid grid-cols-3 gap-3`,children:t.fields.map(t=>(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`label`,{className:`text-[11px] text-gray-400`,children:t.label}),(0,u.jsx)(`input`,{type:`number`,value:e[t.key]??``,onChange:e=>f(t.key,e.target.value),className:`\r
                    w-full\r
                    p-2\r
                    rounded-lg\r
                    bg-surface\r
                    text-sm\r
                    text-center\r
                  `})]},t.key))})]},t.title)),(0,u.jsx)(`div`,{className:`fixed bottom-0 left-0 right-0 p-4 bg-bg`,children:(0,u.jsx)(`button`,{onClick:async()=>{o(!0),await c(e),o(!1)},disabled:i,className:`w-full py-3 rounded-xl bg-primary text-black font-semibold`,children:i?`Saving…`:`Save Profile`})})]})};export{f as default};
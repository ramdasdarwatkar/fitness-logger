import{_ as e,f as t,l as n,m as r,o as i,r as a,s as o,t as s}from"./index-BOkDHWZI.js";import{t as c}from"./PageTransition-DCmixjYD.js";import{n as l}from"./session.service-Czk8ERAY.js";var u=e(a(),1),d=r(),f=o(),p=()=>{let{sessionId:e}=t(),r=s(n.EXERCISES)||[],[a,o]=(0,d.useState)(null),[p,m]=(0,d.useState)({});return(0,d.useEffect)(()=>{e&&(async()=>{o(await l(e));let{data:t}=await i.from(`workout_logs`).select(`*`).eq(`session_id`,e).order(`sets`,{ascending:!0}),n={};t?.forEach(e=>{n[e.exercise_id]||(n[e.exercise_id]=[]),n[e.exercise_id].push(e)}),m(n)})()},[e]),a?(0,f.jsx)(c,{children:(0,f.jsxs)(`div`,{className:`p-4 space-y-5`,children:[(0,f.jsxs)(`div`,{className:`rounded-2xl p-4 bg-white/10 backdrop-blur border border-white/20`,children:[(0,f.jsx)(`p`,{className:`text-xs text-gray-400`,children:(0,u.default)(a.workout_date).format(`dddd, DD MMM YYYY`)}),(0,f.jsx)(`h2`,{className:`text-base font-semibold mt-1`,children:`Workout Logbook`}),(0,f.jsx)(`p`,{className:`mt-2 text-xs text-gray-200`,children:a.notes||`Workout`})]}),(0,f.jsx)(`div`,{className:`grid grid-cols-2 gap-3`,children:Object.entries(p).map(([e,t])=>{let n=r.find(t=>t.id===e);if(!n)return null;let i=n.metrics||{};return(0,f.jsxs)(`div`,{className:`\r
                rounded-xl\r
                p-3\r
                bg-gradient-to-br\r
                from-white/10\r
                via-white/5\r
                to-transparent\r
                border border-white/10\r
                backdrop-blur-md\r
              `,children:[(0,f.jsx)(`h3`,{className:`text-sm font-semibold text-primary mb-2 truncate`,children:n.name}),(0,f.jsxs)(`div`,{className:`\r
                  grid\r
                  grid-cols-[28px_repeat(4,1fr)]\r
                  text-[10px]\r
                  text-gray-400\r
                  mb-1\r
                `,children:[(0,f.jsx)(`span`,{children:`#`}),i.weight&&(0,f.jsx)(`span`,{className:`text-center`,children:`kg`}),i.reps&&(0,f.jsx)(`span`,{className:`text-center`,children:`reps`}),i.duration&&(0,f.jsx)(`span`,{className:`text-center`,children:`time`}),i.distance&&(0,f.jsx)(`span`,{className:`text-center`,children:`dist`})]}),(0,f.jsx)(`div`,{className:`space-y-0.5 text-[11px]`,children:t.map((e,t)=>{let n=e.duration==null?``:`${Math.floor(e.duration/60)}:${String(e.duration%60).padStart(2,`0`)}`,r=e.distance==null?``:e.distance>=1?`${e.distance.toFixed(1)}`:`${Math.round(e.distance*1e3)}`;return(0,f.jsxs)(`div`,{className:`\r
                        grid\r
                        grid-cols-[28px_repeat(4,1fr)]\r
                        items-center\r
                        text-gray-200\r
                      `,children:[(0,f.jsx)(`span`,{className:`text-gray-400`,children:t+1}),i.weight&&(0,f.jsx)(`span`,{className:`text-center`,children:e.weight??``}),i.reps&&(0,f.jsx)(`span`,{className:`text-center`,children:e.reps??``}),i.duration&&(0,f.jsx)(`span`,{className:`text-center`,children:n}),i.distance&&(0,f.jsx)(`span`,{className:`text-center`,children:r})]},e.id)})})]},e)})})]})}):null};export{p as default};
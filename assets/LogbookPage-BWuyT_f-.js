import{_ as e,f as t,l as n,m as r,o as i,r as a,s as o,t as s}from"./index-HK_f4b8g.js";import{n as c}from"./session.service-Dn-3C28A.js";var l=e(a(),1),u=r(),d=o(),f=()=>{let{sessionId:e}=t(),r=s(n.EXERCISES)||[],[a,o]=(0,u.useState)(null),[f,p]=(0,u.useState)({});return(0,u.useEffect)(()=>{e&&(async()=>{o(await c(e));let{data:t}=await i.from(`workout_logs`).select(`*`).eq(`session_id`,e).order(`sets`,{ascending:!0}),n={};t?.forEach(e=>{n[e.exercise_id]||(n[e.exercise_id]=[]),n[e.exercise_id].push(e)}),p(n)})()},[e]),a?(0,d.jsxs)(`div`,{className:`p-4 space-y-5`,children:[(0,d.jsxs)(`div`,{className:`rounded-2xl p-4 bg-white/10 backdrop-blur border border-white/20`,children:[(0,d.jsx)(`p`,{className:`text-xs text-gray-400`,children:(0,l.default)(a.workout_date).format(`dddd, DD MMM YYYY`)}),(0,d.jsx)(`h2`,{className:`text-base font-semibold mt-1`,children:`Workout Logbook`}),(0,d.jsx)(`p`,{className:`mt-2 text-xs text-gray-200`,children:a.notes||`Workout`})]}),(0,d.jsx)(`div`,{className:`grid grid-cols-2 gap-3`,children:Object.entries(f).map(([e,t])=>{let n=r.find(t=>t.id===e);if(!n)return null;let i=n.metrics||{};return(0,d.jsxs)(`div`,{className:`\r
                rounded-xl\r
                p-3\r
                bg-gradient-to-br\r
                from-white/10\r
                via-white/5\r
                to-transparent\r
                border border-white/10\r
                backdrop-blur-md\r
              `,children:[(0,d.jsx)(`h3`,{className:`text-sm font-semibold text-primary mb-2 truncate`,children:n.name}),(0,d.jsxs)(`div`,{className:`\r
                  grid\r
                  grid-cols-[28px_repeat(4,1fr)]\r
                  text-[10px]\r
                  text-gray-400\r
                  mb-1\r
                `,children:[(0,d.jsx)(`span`,{children:`#`}),i.weight&&(0,d.jsx)(`span`,{className:`text-center`,children:`kg`}),i.reps&&(0,d.jsx)(`span`,{className:`text-center`,children:`reps`}),i.duration&&(0,d.jsx)(`span`,{className:`text-center`,children:`time`}),i.distance&&(0,d.jsx)(`span`,{className:`text-center`,children:`dist`})]}),(0,d.jsx)(`div`,{className:`space-y-0.5 text-[11px]`,children:t.map((e,t)=>{let n=e.duration==null?``:`${Math.floor(e.duration/60)}:${String(e.duration%60).padStart(2,`0`)}`,r=e.distance==null?``:e.distance>=1?`${e.distance.toFixed(1)}`:`${Math.round(e.distance*1e3)}`;return(0,d.jsxs)(`div`,{className:`\r
                        grid\r
                        grid-cols-[28px_repeat(4,1fr)]\r
                        items-center\r
                        text-gray-200\r
                      `,children:[(0,d.jsx)(`span`,{className:`text-gray-400`,children:t+1}),i.weight&&(0,d.jsx)(`span`,{className:`text-center`,children:e.weight??``}),i.reps&&(0,d.jsx)(`span`,{className:`text-center`,children:e.reps??``}),i.duration&&(0,d.jsx)(`span`,{className:`text-center`,children:n}),i.distance&&(0,d.jsx)(`span`,{className:`text-center`,children:r})]},e.id)})})]},e)})})]}):null};export{f as default};
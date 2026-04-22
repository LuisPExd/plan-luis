import { useState } from "react";

const C = {
  bg: "#fdf8f3", card: "#ffffff", border: "#ede8e0",
  tesis: "#d97706", dalix: "#ea580c", labs: "#059669",
  lab3d: "#db2777", diana: "#e11d48", personal: "#7c3aed",
  cim: "#2563eb", muted: "#78716c", text: "#1c1917", soft: "#f5f0e8",
};

const TAG = {
  tesis:    { bg: "#fef3c7", color: "#d97706", label: "🧪 Tesis" },
  dalix:    { bg: "#ffedd5", color: "#ea580c", label: "🏢 DALIX" },
  labs:     { bg: "#d1fae5", color: "#059669", label: "⚗️ Labs" },
  lab3d:    { bg: "#fce7f3", color: "#db2777", label: "🖨️ Lab 3D" },
  diana:    { bg: "#ffe4e6", color: "#e11d48", label: "💛 Diana" },
  personal: { bg: "#ede9fe", color: "#7c3aed", label: "⚡ Personal" },
  cim:      { bg: "#dbeafe", color: "#2563eb", label: "📚 CIM" },
  libre:    { bg: "#f3f4f6", color: "#6b7280", label: "🕐 Libre en U" },
};

// Estructura base del día (L-V):
// 6:00  Despertar
// 6:30  🧪 TESIS mañana (1h)
// 8:00  Universidad
// 12:00 🧪 TESIS mediodía (30min) — INAMOVIBLE
// 13:00 Casa — almuerzo
// 14:30 🏢 DALIX seguimiento (30min)
// 15:00 Universidad
// 19:30 💪 Ejercicio (30min)
// 20:00 Ducha + cena
// 20:30 💛 Diana (30min)
// 21:00 🏢 DALIX profundo (2h)
// 23:00 Cierre
// 23:30 😴 Dormir
// DALIX total: 2.5h/día ✅

const DAYS = [
  {
    id:0, date:"Mar 21 abr", dayName:"Martes", week:1, isToday:true,
    mood:"Respira. Solo hoy. Un paso a la vez.",
    color:C.tesis,
    schedule:[
      {time:"6:00",  label:"Despertar + desayuno sin celular"},
      {time:"6:30",  label:"🧪 TESIS — leer UN paper de bibliografía (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad — Lab 3D y materiales", cat:"labs"},
      {time:"12:00", label:"🧪 TESIS — 30 min bibliografía (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo y descanso real", cat:"personal"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad — preparar Labs Corrosión mañana", cat:"labs"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena tranquila"},
      {time:"20:30", label:"💛 Diana — llamada ~30 min", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"Cierre: anotar 3 tareas de mañana", cat:"personal", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Revisar impresiones 3D pendientes y calidad de piezas", cat:"lab3d"},
      {text:"Preparar materiales Lab Corrosión G7 y G1 (mié)", cat:"labs"},
    ],
    highlight:"Hoy empieza el plan. Solo un paso a la vez.",
  },
  {
    id:1, date:"Mié 22 abr", dayName:"Miércoles", week:1,
    mood:"Día de labs. El bloque de tesis al mediodía, sin excusas.",
    color:C.labs,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — redactar intro Capítulo 1 (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad"},
      {time:"9:00",  label:"⚗️ Lab Corrosión G7 (9–11am)", cat:"labs", fixed:true},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — contactar Tera: estado esquemáticos", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad"},
      {time:"16:00", label:"⚗️ Lab Corrosión G1 (4–6pm)", cat:"labs", fixed:true},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"Preparar materiales G2 de mañana", cat:"labs", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Coordinar con Dra. Guerrero — sesión potenciostato", cat:"tesis"},
      {text:"Imprimir piezas pendientes Lab 3D", cat:"lab3d"},
    ],
    highlight:"5 grupos de corrosión esta semana — hoy G7 y G1.",
  },
  {
    id:2, date:"Jue 23 abr", dayName:"Jueves", week:1,
    mood:"Lab de mañana + DALIX con fuerza en la noche.",
    color:C.dalix,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — buscar 2 papers sobre curvas Tafel (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad"},
      {time:"9:00",  label:"⚗️ Lab Corrosión G2 (9–11am)", cat:"labs", fixed:true},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo + descanso"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad — revisar Lab 3D + piezas", cat:"lab3d"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"Cierre del día", cat:"personal", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Preparar materiales Lab Corrosión G3 (viernes)", cat:"labs"},
      {text:"Estudiar impresoras 3D — avance propio", cat:"lab3d"},
      {text:"Avanzar CIM — revisar material del curso", cat:"cim"},
    ],
    highlight:"Hoy: seguimiento Tera si no respondieron ayer.",
  },
  {
    id:3, date:"Vie 24 abr", dayName:"Viernes", week:1,
    mood:"Día duro. Labs todo el día. Permítete estar cansado al final.",
    color:C.labs,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — redactar sección 1.1 problemática (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad"},
      {time:"9:00",  label:"⚗️ Lab Corrosión G3 (9–11am)", cat:"labs", fixed:true},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad"},
      {time:"16:00", label:"⚗️ Lab Corrosión G4 (4–6pm)", cat:"labs", fixed:true},
      {time:"18:00", label:"📐 Preparar guía Lab 1 RMT (6–8pm)", cat:"labs", fixed:true},
      {time:"19:30", label:"💪 Ejercicio 20 min (fue duro, algo es suficiente)", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"Descanso — mañana es sábado", cat:"personal"},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Revisar y organizar guía Lab 1 RMT", cat:"labs"},
      {text:"Cerrar pendientes Lab 3D de la semana", cat:"lab3d"},
    ],
    highlight:"Viernes pesado: G3, G4 y guía RMT. Mañana respiras.",
  },
  {
    id:4, date:"Sáb 25 abr", dayName:"Sábado", week:1,
    mood:"Tu día de avance profundo. Tesis en la mañana, DALIX en la tarde.",
    color:C.tesis,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — bloque largo: redactar Cap. 1 (2.5h)", cat:"tesis", check:true},
      {time:"9:00",  label:"Desayuno tranquilo + pausa", cat:"personal"},
      {time:"10:00", label:"🧪 TESIS — revisar y corregir lo escrito (1h)", cat:"tesis", check:true},
      {time:"11:00", label:"Pausa libre"},
      {time:"13:00", label:"Almuerzo"},
      {time:"14:00", label:"🏢 DALIX — sesión semanal profunda (3h)", cat:"dalix", check:true},
      {time:"17:00", label:"Descanso / deporte / salir", cat:"personal"},
      {time:"20:00", label:"💛 Diana — videollamada más larga", cat:"diana", check:true},
      {time:"22:00", label:"Desconexión total"},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[],
    highlight:"Sábado = avance real. Cap.1 + sesión DALIX = semana exitosa.",
  },
  {
    id:5, date:"Dom 26 abr", dayName:"Domingo", week:1,
    mood:"Descanso activo. Máximo 2 horas si tienes energía.",
    color:C.diana,
    schedule:[
      {time:"8:00",  label:"Despertar tranquilo"},
      {time:"9:00",  label:"Desayuno sin prisa"},
      {time:"10:00", label:"🧪 TESIS opcional — revisar bibliografía (1h máx)", cat:"tesis"},
      {time:"12:00", label:"Almuerzo"},
      {time:"14:00", label:"Descanso total — nada de trabajo obligatorio", cat:"personal"},
      {time:"20:00", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"23:00", label:"😴 Dormir temprano"},
    ],
    libre_u:[],
    highlight:"Descansar hoy = rendir mejor toda la próxima semana.",
  },
  {
    id:6, date:"Lun 27 abr", dayName:"Lunes", week:2,
    mood:"Semana de evaluaciones. Mantén la calma, ya preparaste.",
    color:C.cim,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — Marco Teórico sección 2.1 (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad — Lab 3D mañana", cat:"lab3d"},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad"},
      {time:"16:00", label:"📐 Lab 1 RMT — Aula 35 (4–6pm)", cat:"labs", fixed:true},
      {time:"18:00", label:"📐 Vigilancia RTE — T18 (6–8pm)", cat:"labs", fixed:true},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"📝 Corregir 3 informes", cat:"cim", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Corregir 3–4 informes (primera tanda)", cat:"cim"},
      {text:"Repasar Evaluación RMT — unidad 1 hasta Torsión", cat:"labs"},
      {text:"Avanzar tesis si hay tiempo", cat:"tesis"},
    ],
    highlight:"Empieza a corregir informes hoy: 3/día y el viernes los cierras.",
  },
  {
    id:7, date:"Mar 28 abr", dayName:"Martes", week:2,
    mood:"Evaluación RMT mañana. Prepara bien y duerme bien esta noche.",
    color:C.labs,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — sección 2.2 fundamentos electroquímicos (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad — Lab 3D + materiales", cat:"lab3d"},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad"},
      {time:"18:00", label:"📐 Preparar Evaluación RMT (6–8pm)", cat:"labs", fixed:true},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"📝 Corregir 3 informes", cat:"cim", check:true},
      {time:"23:30", label:"😴 Dormir — evaluación mañana"},
    ],
    libre_u:[
      {text:"Corregir 3–4 informes", cat:"cim"},
      {text:"Repasar torsión y fallas para evaluación RMT", cat:"labs"},
      {text:"Piezas Lab 3D si hay tiempo", cat:"lab3d"},
    ],
    highlight:"Duerme antes de las 11:30pm — evaluación mañana.",
  },
  {
    id:8, date:"Mié 29 abr", dayName:"Miércoles", week:2,
    mood:"⚠️ Evaluación RMT hoy. Ya estás preparado.",
    color:"#dc2626",
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — repasar lo escrito (30 min)", cat:"tesis", check:true},
      {time:"7:00",  label:"Repaso rápido Evaluación RMT"},
      {time:"8:00",  label:"Universidad"},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo + descanso antes de evaluación"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad — prepararse"},
      {time:"16:00", label:"⚠️ EVALUACIÓN RMT (4–6pm)", cat:"labs", fixed:true},
      {time:"18:00", label:"Desconéctate — te lo mereces 🎉", cat:"personal"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"📝 Corregir 3 informes", cat:"cim", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Corregir 2–3 informes (mañana antes de evaluación)", cat:"cim"},
      {text:"Avanzar tesis si la mente está tranquila", cat:"tesis"},
    ],
    highlight:"Después de la evaluación: suelta. Ya lo hiciste.",
  },
  {
    id:9, date:"Jue 30 abr", dayName:"Jueves", week:2,
    mood:"⚠️ Evaluación DEM1. Dos seguidas — eres ingeniero, tú puedes.",
    color:"#dc2626",
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — Cap. 2 sección aceros al carbono (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad"},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — seguimiento + validar avance Tera", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad — repaso fallas DEM1"},
      {time:"16:00", label:"⚠️ EVALUACIÓN DEM1 — Fallas (4–6pm)", cat:"labs", fixed:true},
      {time:"18:00", label:"Descanso — ¡dos evaluaciones cerradas! 🎉", cat:"personal"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"📝 Corregir 3 informes", cat:"cim", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Repasar fallas DEM1 antes de la evaluación", cat:"labs"},
      {text:"Corregir 2 informes rápidos", cat:"cim"},
      {text:"Revisar Lab 3D", cat:"lab3d"},
    ],
    highlight:"Al terminar la evaluación: celebra internamente. Lo lograste.",
  },
  {
    id:10, date:"Vie 1 may", dayName:"Viernes", week:2,
    mood:"Cerrar los 15 informes hoy. El fin de semana es tuyo.",
    color:C.cim,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — Cap. 2: tamaño de grano (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad"},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — seguimiento 30 min", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad — Lab 3D + pendientes"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"📝 Cerrar últimos informes restantes 🎯", cat:"cim", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"🎯 META: cerrar todos los informes restantes", cat:"cim"},
      {text:"Revisar piezas Lab 3D de la semana", cat:"lab3d"},
      {text:"Avanzar tesis si hay espacio", cat:"tesis"},
    ],
    highlight:"Si cierras informes hoy, el sábado es 100% tesis + DALIX.",
  },
  {
    id:11, date:"Sáb 2 may", dayName:"Sábado", week:2,
    mood:"Sábado clave. Cap.2 tesis + sesión DALIX = enorme avance.",
    color:C.tesis,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — bloque largo: terminar Cap. 2 (2.5h)", cat:"tesis", check:true},
      {time:"9:00",  label:"Pausa + desayuno"},
      {time:"10:00", label:"🧪 TESIS — revisar y corregir Cap. 1 y 2 (1h)", cat:"tesis", check:true},
      {time:"11:00", label:"Pausa libre"},
      {time:"13:00", label:"Almuerzo"},
      {time:"14:00", label:"🏢 DALIX — sesión semanal profunda con Tera (3h)", cat:"dalix", check:true},
      {time:"17:00", label:"Descanso / salir / deporte", cat:"personal"},
      {time:"20:00", label:"💛 Diana — videollamada larga", cat:"diana", check:true},
      {time:"22:00", label:"Desconexión total"},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[],
    highlight:"Cap.1 + Cap.2 listos para enviar a tu asesora la próxima semana.",
  },
  {
    id:12, date:"Dom 3 may", dayName:"Domingo", week:2,
    mood:"Descanso y recarga. Llegaste a la semana 2. Lo mereces.",
    color:C.diana,
    schedule:[
      {time:"8:00",  label:"Despertar tranquilo"},
      {time:"10:00", label:"🧪 TESIS opcional — repasar bibliografía (1h máx)", cat:"tesis"},
      {time:"13:00", label:"Almuerzo"},
      {time:"15:00", label:"Descanso total", cat:"personal"},
      {time:"20:00", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"23:00", label:"😴 Dormir temprano"},
    ],
    libre_u:[],
    highlight:"Recarga completa. Lunes empieza la etapa experimental.",
  },
  {
    id:13, date:"Lun 4 may", dayName:"Lunes", week:3,
    mood:"Nueva etapa: experimentación en el horizonte. Gran hito.",
    color:C.tesis,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — plan Etapa II: preparación metalográfica (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad — Lab 3D + materiales"},
      {time:"12:00", label:"🧪 TESIS — 30 min (inamovible)", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — validar diseño PCB con Tera", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"Cierre del día", cat:"personal", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Coordinar sesión potenciostato — escribir a Dra. Guerrero", cat:"tesis"},
      {text:"Preparar probetas para metalografía", cat:"tesis"},
      {text:"DALIX: validar con Tera estado del PCB", cat:"dalix"},
    ],
    highlight:"Hito tesis: empieza la preparación experimental.",
  },
  {
    id:14, date:"Mar 5 may", dayName:"Martes", week:3,
    mood:"Cierre de los 15 días. Revisa cuánto avanzaste — es más de lo que crees.",
    color:C.personal,
    schedule:[
      {time:"6:00",  label:"Despertar"},
      {time:"6:30",  label:"🧪 TESIS — revisión final Cap. 1 y 2 (1h)", cat:"tesis", check:true},
      {time:"8:00",  label:"Universidad"},
      {time:"12:00", label:"🧪 TESIS — enviar borrador a Dra. Guerrero 🎯", cat:"tesis", check:true},
      {time:"13:00", label:"Casa — almuerzo"},
      {time:"14:30", label:"🏢 DALIX — resumen: ¿esquemáticos aprobados?", cat:"dalix", check:true},
      {time:"15:00", label:"Universidad"},
      {time:"19:30", label:"💪 Ejercicio 30 min", cat:"personal", check:true},
      {time:"20:00", label:"Ducha + cena"},
      {time:"20:30", label:"💛 Diana — llamada", cat:"diana", check:true},
      {time:"21:00", label:"🏢 DALIX — trabajo profundo (2h)", cat:"dalix", check:true},
      {time:"23:00", label:"📋 Planificar la siguiente quincena 🗓️", cat:"personal", check:true},
      {time:"23:30", label:"😴 Dormir"},
    ],
    libre_u:[
      {text:"Revisar avance: ¿Cap.1 y Cap.2 listos?", cat:"tesis"},
      {text:"Estado DALIX: ¿Tera tiene esquemáticos aprobados?", cat:"dalix"},
      {text:"Planificar siguiente quincena (6–20 mayo)", cat:"personal"},
    ],
    highlight:"15 días completados. Tesis avanzó. DALIX en carril. Eso es éxito.",
  },
];

const WEEKS = [
  {n:1, label:"Semana 1", sub:"21–26 abril"},
  {n:2, label:"Semana 2", sub:"27 abr – 3 mayo"},
  {n:3, label:"Semana 3", sub:"4–5 mayo"},
];

export default function PlanCompleto() {
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState({});

  const toggle = (key) => setChecked(p => ({...p, [key]: !p[key]}));
  const day = DAYS[activeDay];
  const checkable = day.schedule.filter(s => s.check);
  const doneCount = checkable.filter((_,i) => checked[`${activeDay}-s-${i}`]).length;
  const pct = checkable.length ? Math.round((doneCount/checkable.length)*100) : 0;

  const isComplete = (id) => {
    const d = DAYS[id];
    const c = d.schedule.filter(s => s.check);
    return c.length > 0 && c.every((_,i) => checked[`${id}-s-${i}`]);
  };

  return (
    <div style={{fontFamily:"'Georgia',serif", background:C.bg, minHeight:"100vh", color:C.text, paddingBottom:80, maxWidth:500, margin:"0 auto"}}>

      {/* HEADER */}
      <div style={{background:"#fff", borderBottom:`2px solid ${C.border}`, padding:"18px 18px 14px"}}>
        <div style={{fontSize:9, letterSpacing:4, color:C.muted, textTransform:"uppercase", marginBottom:4}}>Luis Martinez · UDEP</div>
        <div style={{fontSize:22, fontWeight:900, lineHeight:1.1}}>Plan 15 días</div>
        <div style={{fontSize:11, color:C.muted, marginBottom:14}}>21 abril – 5 mayo · Todo en un solo lugar</div>

        <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:14}}>
          {[
            {l:"Tesis",v:"1.5h/día",c:C.tesis},
            {l:"DALIX",v:"2.5h/día",c:C.dalix},
            {l:"Ejercicio",v:"30 min",c:C.personal},
            {l:"Diana",v:"20:30",c:C.diana},
            {l:"Dormir",v:"23:30",c:C.labs},
          ].map(s=>(
            <div key={s.l} style={{background:s.c+"18", border:`1px solid ${s.c}33`, borderRadius:8, padding:"4px 10px"}}>
              <div style={{fontSize:8, color:s.c, letterSpacing:1}}>{s.l}</div>
              <div style={{fontSize:11, fontWeight:700}}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
          {Object.entries(TAG).map(([k,v])=>(
            <span key={k} style={{fontSize:9, padding:"2px 7px", borderRadius:20, background:v.bg, color:v.color, fontWeight:600}}>{v.label}</span>
          ))}
        </div>
      </div>

      {/* DAY SELECTOR */}
      <div style={{padding:"14px 18px 0"}}>
        {WEEKS.map(w=>(
          <div key={w.n} style={{marginBottom:12}}>
            <div style={{fontSize:8, letterSpacing:3, color:C.muted, textTransform:"uppercase", marginBottom:6}}>{w.label} · {w.sub}</div>
            <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
              {DAYS.filter(d=>d.week===w.n).map(d=>{
                const isActive = activeDay===d.id;
                const complete = isComplete(d.id);
                return (
                  <button key={d.id} onClick={()=>setActiveDay(d.id)} style={{
                    padding:"5px 10px", borderRadius:8, cursor:"pointer", fontFamily:"inherit", fontSize:11,
                    background: isActive ? d.color : complete ? "#d1fae5" : "#fff",
                    color: isActive ? "#fff" : complete ? C.labs : C.text,
                    border: isActive ? `2px solid ${d.color}` : `1px solid ${C.border}`,
                    fontWeight: isActive ? 700 : 400,
                  }}>
                    {d.isToday?"⭐ ":""}{d.date.split(" ").slice(0,2).join(" ")}{complete?" ✓":""}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* DAY CARD */}
      <div style={{padding:"12px 18px 0"}}>
        <div style={{background:"#fff", borderRadius:14, border:`1px solid ${C.border}`, borderTop:`4px solid ${day.color}`, padding:"14px 16px", marginBottom:12}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:9, letterSpacing:3, color:day.color, textTransform:"uppercase", marginBottom:2}}>
                Día {day.id+1} de 15 · {day.dayName}{day.isToday?" · HOY":""}
              </div>
              <div style={{fontSize:18, fontWeight:900}}>{day.date}</div>
              <div style={{fontSize:11, color:C.muted, marginTop:4, fontStyle:"italic"}}>{day.mood}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:26, fontWeight:900, color:day.color}}>{pct}%</div>
              <div style={{fontSize:9, color:C.muted}}>{doneCount}/{checkable.length}</div>
            </div>
          </div>
          <div style={{height:4, background:C.border, borderRadius:2, marginTop:10, overflow:"hidden"}}>
            <div style={{height:"100%", width:`${pct}%`, background:day.color, borderRadius:2, transition:"width 0.4s"}}/>
          </div>
          {day.highlight && (
            <div style={{marginTop:10, padding:"8px 10px", background:C.soft, borderRadius:8, fontSize:11, borderLeft:`3px solid ${day.color}`}}>
              💡 {day.highlight}
            </div>
          )}
        </div>

        {/* Schedule */}
        <div style={{background:"#fff", borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12}}>
          <div style={{padding:"9px 14px", borderBottom:`1px solid ${C.border}`, fontSize:9, letterSpacing:3, color:C.muted, textTransform:"uppercase"}}>
            Horario del día
          </div>
          {day.schedule.map((s,i)=>{
            const key=`${activeDay}-s-${i}`;
            const isDone=checked[key];
            const tag=s.cat?TAG[s.cat]:null;
            return (
              <div key={i} onClick={()=>s.check&&toggle(key)} style={{
                display:"flex", gap:8, padding:"9px 14px",
                borderBottom:i<day.schedule.length-1?`1px solid ${C.border}`:"none",
                cursor:s.check?"pointer":"default",
                background:isDone?"#f0fdf4":"transparent",
                opacity:isDone?0.6:1, alignItems:"flex-start",
              }}>
                <div style={{minWidth:38, fontSize:10, color:C.muted, paddingTop:2, flexShrink:0}}>{s.time}</div>
                {s.check?(
                  <div style={{width:16, height:16, borderRadius:4, flexShrink:0, marginTop:1,
                    border:`2px solid ${isDone?C.labs:C.border}`, background:isDone?C.labs:"transparent",
                    display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {isDone&&<span style={{color:"#fff",fontSize:10}}>✓</span>}
                  </div>
                ):(
                  <div style={{width:6, height:6, borderRadius:"50%", background:s.fixed?day.color:C.border, marginTop:5, flexShrink:0}}/>
                )}
                <div style={{flex:1}}>
                  <span style={{fontSize:12, color:isDone?C.muted:C.text, textDecoration:isDone?"line-through":"none"}}>
                    {s.fixed&&<span style={{fontSize:9, background:"#fee2e2", color:"#dc2626", padding:"1px 5px", borderRadius:4, marginRight:5, fontWeight:700}}>FIJO</span>}
                    {s.label}
                  </span>
                </div>
                {tag&&<span style={{fontSize:9, padding:"2px 6px", borderRadius:10, background:tag.bg, color:tag.color, flexShrink:0, marginTop:2}}>{tag.label}</span>}
              </div>
            );
          })}
        </div>

        {/* Libre en U */}
        {day.libre_u.length>0&&(
          <div style={{background:"#fff", borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:12}}>
            <div style={{padding:"9px 14px", borderBottom:`1px solid ${C.border}`, fontSize:9, letterSpacing:3, color:C.muted, textTransform:"uppercase"}}>
              🕐 Si terminas antes en la u — aprovecha
            </div>
            {day.libre_u.map((t,i)=>{
              const key=`${activeDay}-l-${i}`;
              const isDone=checked[key];
              const tag=TAG[t.cat]||TAG.libre;
              return (
                <div key={i} onClick={()=>toggle(key)} style={{
                  display:"flex", gap:8, padding:"9px 14px",
                  borderBottom:i<day.libre_u.length-1?`1px solid ${C.border}`:"none",
                  cursor:"pointer", background:isDone?"#f0fdf4":"transparent",
                  opacity:isDone?0.6:1, alignItems:"center",
                }}>
                  <div style={{width:16, height:16, borderRadius:4, flexShrink:0,
                    border:`2px solid ${isDone?C.labs:C.border}`, background:isDone?C.labs:"transparent",
                    display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {isDone&&<span style={{color:"#fff",fontSize:10}}>✓</span>}
                  </div>
                  <div style={{flex:1, fontSize:12, color:isDone?C.muted:C.text, textDecoration:isDone?"line-through":"none"}}>{t.text}</div>
                  <span style={{fontSize:9, padding:"2px 6px", borderRadius:10, background:tag.bg, color:tag.color, flexShrink:0}}>{tag.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Regla de oro */}
        <div style={{background:"#fffbeb", border:`1px solid #fde68a`, borderRadius:14, padding:"14px 16px"}}>
          <div style={{fontSize:9, letterSpacing:3, color:C.tesis, textTransform:"uppercase", marginBottom:8}}>Regla de oro — todos los días</div>
          <div style={{fontSize:11, color:"#78350f", lineHeight:1.9}}>
            <strong>1.</strong> Tesis: 6:30am (1h) + mediodía (30min) = 1.5h garantizadas<br/>
            <strong>2.</strong> DALIX: 14:30 (30min seguimiento) + 21:00 (2h profundo) = 2.5h/día<br/>
            <strong>3.</strong> Labs: están en el calendario — prepara la noche anterior<br/>
            <strong>4.</strong> Diana: 20:30 todos los días. No es negociable.<br/>
            <strong>5.</strong> 23:30 → dormir. Sin excepciones estos 15 días.
          </div>
        </div>
      </div>
    </div>
  );
}

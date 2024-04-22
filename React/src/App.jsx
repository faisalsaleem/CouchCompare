import { useState } from 'react'
import Step1 from './components/step1'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step2 from './components/step2';
import Step3 from './components/step3';
import Step4 from './components/step4';
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Step1/>} />
    <Route path="/step2" element={<Step2/>} />
    <Route path="/step3" element={<Step3/>} />
    <Route path="/step4" element={<Step4/>} />


   </Routes>
   </BrowserRouter>
  )
}

export default App
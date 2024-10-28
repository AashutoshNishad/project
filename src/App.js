import React, { useState } from 'react'
import FeatureBox from './Component/smallerComp/FeatureBox'
import Header from './Component/smallerComp/Header'
import SmartBoard from './Component/smallerComp/SmartBoard'

export default function App() {


  const [mode, setmode] = useState({ mode: "noraml" })


  return (
    <>
      <Header />
      {/* <Toolbar /> */}
      <FeatureBox mode={mode} setmode={setmode} />
      <SmartBoard mode={mode} setmode={setmode} />
      {/* <Board /> */}
    </>
  )
}

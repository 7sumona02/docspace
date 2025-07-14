'use client'

import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import React, { useEffect, useState } from 'react'
import "@excalidraw/excalidraw/index.css";
import { FILE } from "../../dashboard/page";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Canvas = ({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) => {
    const [whiteBoardData, setWhiteBoardData] = useState<any>()
    const updateWhiteBoard = useMutation(api.files.updateWhiteboard)
    useEffect(() => {
        onSaveTrigger&&saveWhiteboard()
    },[onSaveTrigger])
    const saveWhiteboard = () => {
        updateWhiteBoard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoardData)
        }).then(res=>console.log(res))
    }
  return (
    <div style={{ height: "710px" }} className="custom-styles">
        {fileData &&
            <Excalidraw initialData={{
                elements: fileData?.whiteboard&&JSON.parse(fileData?.whiteboard)
            }} onChange={(excalidrawElements, appState, files)=>setWhiteBoardData(excalidrawElements)}>
                <WelcomeScreen />
            </Excalidraw>
        }
    </div>
  )
}

export default Canvas
'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
// @ts-expect-error
import Checklist from '@editorjs/checklist'
// @ts-expect-error
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/page';

const rawDocument = {
    "time" : 1550476186479,
    "blocks" : [{
        data: {
            text: 'Document Name',
            level: 2
        },
        id: '123',
        type: 'header'
    },
    {
        data: {
            level: 4
        },
        id: '1234',
        type: 'header'
    }
],
    "version" : "2.8.1"
}
const Editor = ({onSaveTrigger,fileId,fileData}) => {
    const ref = useRef(undefined)
    const updateDocument = useMutation(api.files.updateDocument)
    // const [document,setDocument] = useState(rawDocument)
   useEffect(() => {
    if (fileData) {
        initEditor();
    }
}, [fileData]);

    useEffect(() => {
    console.log(onSaveTrigger);
    if (onSaveTrigger) {
        onSaveDocument();
    }
}, [onSaveTrigger]);
    
    const initEditor = () => {
        const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs',
  data: fileData?.document?JSON.parse(fileData.document):rawDocument,
  tools: {
    header: {
      // @ts-expect-error
      class: Header,
      shortcut: 'CMD+SHIFT+H',
      config: {
        placeholder: 'Enter a header',
      }
    },
    List: {
        // @ts-expect-error
      class: EditorjsList,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      },
    },
    // checklist: {
    //   class: Checklist,
    //   inlineToolbar: true,
    // },
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
      }
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
    },
    paragraph: {
        // @ts-expect-error
      class: Paragraph,
      inlineToolbar: true,
    },
  }
});
        ref.current = editor
    }

    const onSaveDocument = () => {
        if(ref.current){
            ref.current.save().then((outputData) => {
  console.log('Article data: ', outputData)
  updateDocument({
    _id: fileId,
    document: JSON.stringify(outputData)
  }).then(resp=>{
        toast('Document updated!')
  },(e) => {
    toast('Some error occurred')
  })
}).catch((error) => {
  console.log('Saving failed: ', error)
});
        }
    }
  return (
    <div>
        <div id='editorjs' className='ml-16'></div>
    </div>
  )
}

export default Editor
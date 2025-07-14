'use client'
import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';

const Editor = () => {
    const ref = useRef<EditorJS>()
    useEffect(() => {
      initEditor()
    }, [])
    
    const initEditor = () => {
        const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs',
  tools: {
    header: {
      class: Header as any,
      shortcut: 'CMD+SHIFT+H',
      config: {
        placeholder: 'Enter a header',
      }
    },
    List: {
      class: EditorjsList as any,
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
      class: LinkTool as any,
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
      class: Paragraph as any,
      inlineToolbar: true,
    },
  }
});
        ref.current = editor
    }
  return (
    <div>
        <div id='editorjs' className='ml-10'></div>
    </div>
  )
}

export default Editor
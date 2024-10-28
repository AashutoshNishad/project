import React from 'react'
import "./Header.css"
export default function Header() {
    return (
        <div>
            <div id='document-hedaer'>

                <div id='document-hedaer-left'>
                    <div id='header-logo' className='hoverEffect'>
                        Draw.io
                    </div>

                    <div className='vertical-devider' />
                    <div id='header-fileName' className='hoverEffect' >
                        Untitel Document
                    </div>
                    <div>
                        <div id='dot3-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <ul id='dropdown-options'>
                                <li>File</li>
                                <li>Export</li>
                                <li>Import</li>
                                <li>Copy Document</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id='document-hedaer-right'>

                    <div id='video-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                        </svg>
                    </div>
                    <button id='shere-button'>
                        Shere
                    </button>
                </div>
            </div>
        </div>
    )
}

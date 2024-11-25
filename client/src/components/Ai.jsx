import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { Skeleton } from '@/components/ui/skeleton'; 

const Ai = () => {
  const [Input, setInput] = useState('');
  const messagesRef = useRef(null);
  const [Messages, setMessages] = useState([]);
  const geminiApi = import.meta.env.VITE_GEMINI_API
  const genAI = new GoogleGenerativeAI(geminiApi);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [Loading, setLoading] = useState(false);

  const HandleSend = useCallback(async () => {
    if (Input) {
      setMessages((prevMessages) => [...prevMessages, { type: 'outgoing', value: Input }]);
      setLoading(true)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      let inputInstance = Input
      setInput('');
      const result = await model.generateContent(inputInstance);
      const response = await result.response.text(); // Await the response.text()
      setMessages((prevMessages) => [...prevMessages, { type: 'incoming', value: response }]); // Fixed typo here
      if(response) {
        setLoading(false);
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    }
  }, [Input]);

  useEffect(() => {
    function handleEnter(e) {
      if (e.key === 'Enter') {
        HandleSend();
      }
    }

    window.addEventListener('keydown', handleEnter);

    return () => {
      window.removeEventListener('keydown', handleEnter);
    }
  }, [HandleSend]);

  return (
    <div className="w-full h-[100%] w-full p-2 relative">
      <div id="messages" ref={messagesRef} className="h-[75vh] overflow-y-scroll flex flex-col gap-4 pt-4">
        {
          Messages.map((message, index) => (
            <div key={index} id="message" className="w-full relative h-fit">
              <div className={`${(message.type === 'outgoing') ? 'ml-auto bg-[#3B5BCE] max-w-[80%]' : 'mr-auto bg-[#1e1e1e] max-w-[100%]'} relative break-words-container w-[fit-content]  px-4 py-2 rounded-[12px]`}>
                {
                  (message.type === 'incoming') ? (
                    <ReactMarkdown
                      children={message.value}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      className="prose"
                    />
                  ) : (message.value)
                }
              </div>
            </div>
          ))
        }

        <Skeleton style={{ display: Loading ? '' : 'none' }} className={` w-[80%] h-[100px] px-4 py-2 flex flex-col gap-3`}>
          <Skeleton className="w-full h-[10px]"/>
          <Skeleton className="w-[60%] h-[10px]"/>
          <Skeleton className="w-[70%] h-[10px]"/>
          <Skeleton className="w-[50%] h-[10px]"/>
        </Skeleton>
      </div>
      <div id="input" className="relative w-full h-[50px] mt-4 flex gap-2 justify-center">
        <input value={Input} onChange={(e) => setInput(e.target.value)} placeholder="Ask to AI" className="px-4 outline-none w-full h-full rounded-[14px] bg-[#1E1E1E]" />
        <button onClick={HandleSend} className="h-full w-[50px] rounded-[14px] bg-[#1e1e1e] px-3 bg-[#3B5BCE] flex items-center justify-center"><Send className="w-5 h-5" /></button>
      </div>
    </div>
  );
};

export default Ai;

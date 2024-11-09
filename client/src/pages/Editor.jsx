import React, {useState, useEffect} from 'react';
import CodeEditor from '@/components/CodeEditor'

const Editor = () => {
	const [Code, setCode] = useState('//start writing your code here')

	function handleCodeChange(newcode) {
		setCode(newcode)
	}

	return (
		<CodeEditor value={Code} onChange={setCode}/>
	)
};

export default Editor;
import { useState } from 'react';
import './App.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

function App() {

  const [imgURL, setImgURL] = useState('');
  const [progress, setProgress] = useState(0);

  const handleUpload = (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if(!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progess = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progess);
      },
      (error) => {
        alert(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setImgURL(url);
        });
      }
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <form action="" onSubmit={handleUpload}>
          <input type="file" />
          <button>Upload</button>
        </form>
        <br />
        {!imgURL && <progress value={progress} max='100'/>}
        {imgURL && <img src={imgURL} alt= 'Imagem' width='200' />}
      </header>
    </div>
  );
}

export default App;


// import { useState } from 'react';
// import './App.css';
// import { ref, uploadBytesResumable } from 'firebase/storage';
// import { storage } from './firebase';

// function App() {

//   const [imgURL, setImgURL] = useState('');
//   const [progress, setProgress] = useState(0);

//   const handleUpload = (event) => {
//     event.preventDefault();
//     const file = event.target[0]?.files[0];
//     if(!file) return;

//     const storageRef = ref(storage, `images${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progess = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgress(progress);
//         },
//     )

//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <form action="" onSubmit={handleUpload}>
//           <input type="file" />
//           <button>Upload</button>
//         </form>
//       </header>
//     </div>
//   );
// }

// export default App;

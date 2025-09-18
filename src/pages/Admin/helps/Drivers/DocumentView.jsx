import React from "react";

function DocumentView({
  docUrl = "https://dummyimage.com/600x400/000/fff",
  docName,
}) {
  return (
    <div>
      <h1 className="text-center text-2xl mb-4">{docName.docName}</h1>
      <img className="max-h-[300px]" src={docUrl} alt="" />
      <button>Okey</button>
    </div>
  );
}

export default DocumentView;

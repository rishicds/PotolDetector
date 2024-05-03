"use client"
import React, { useState, ChangeEvent } from "react";

interface Prediction {
  predictions: PredictionItem[];
}

interface PredictionItem {
  tagName: string;
  probability: number;
}

const ImageUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    sendImageForPrediction(file);
  };

  const sendImageForPrediction = async (imageFile: File) => {
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_PREDICTION_URL;
    if (!url) {
      console.error("Prediction URL not provided");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Prediction-Key': process.env.NEXT_PUBLIC_PREDICTION_KEY || '',
          'Content-Type': 'application/octet-stream'
        },
        body: imageFile
      });
      const data: Prediction = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPredictionMessage = () => {
    if (loading) {
      return <p>Please wait...</p>;
    }
    if (!predictionResult || !predictionResult.predictions) return null;
    const potolPrediction = predictionResult.predictions.find((prediction: PredictionItem) => prediction.tagName === "potol");
    if (!potolPrediction || potolPrediction.probability < 0.7) {
      return <p className="text-3xl text-red-500">This Image does not have Potol! 😒</p>;
    } else {
      return <p className="text-3xl text-green-500">This Image has Potol! 😊</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">PotolDetector</h1>
      <h2 className="text-xl mb-4">Upload an image and my advanced AI will tell you if it's a potol or not</h2>
      {selectedImage && <img src={selectedImage} alt="Selected" className="max-w-full mb-4" />}
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {renderPredictionMessage()}
    </div>
  );
}

export default ImageUploader;

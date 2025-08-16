'use client';

interface Recipient {
  id: string;
  name: string;
  title: string;
  company: string;
  address: string;
}

interface CoverLetter {
  id: string;
  title: string;
  date: string;
  recipient?: Recipient;
  salutation: string;
  body: string[];
  closing: string;
  signature: string;
}

interface CoverLetterDisplayProps {
  coverLetter: CoverLetter;
}

export default function CoverLetterDisplay({ coverLetter }: CoverLetterDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{coverLetter.title}</h2>
      </div>

      {/* Date */}
      <div className="mb-6">
        <p className="text-gray-600">{coverLetter.date}</p>
      </div>

      {/* Recipient Information */}
      {coverLetter.recipient && (
        <div className="mb-6">
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">{coverLetter.recipient.name}</p>
            <p className="text-gray-600">{coverLetter.recipient.title}</p>
            <p className="text-gray-600">{coverLetter.recipient.company}</p>
            <p className="text-gray-600 whitespace-pre-line">{coverLetter.recipient.address}</p>
          </div>
        </div>
      )}

      {/* Salutation */}
      <div className="mb-4">
        <p className="text-gray-900">{coverLetter.salutation}</p>
      </div>

      {/* Body */}
      <div className="mb-6 space-y-4">
        {coverLetter.body.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Closing */}
      <div className="mb-4">
        <p className="text-gray-900">{coverLetter.closing}</p>
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="text-gray-900 whitespace-pre-line">{coverLetter.signature}</p>
      </div>
    </div>
  );
}

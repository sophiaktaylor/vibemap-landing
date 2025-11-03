import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }: CardProps) {
  return <div className={`px-6 py-4 border-b border-slate-200 ${className}`} {...props} />;
}

export function CardTitle({ className = '', ...props }: CardProps) {
  return <h3 className={`text-lg font-semibold text-slate-900 ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }: CardProps) {
  return <div className={`px-6 py-4 ${className}`} {...props} />;
}

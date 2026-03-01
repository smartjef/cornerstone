"use client";

import dynamic from 'next/dynamic';

const DonateClient = dynamic(() => import('./DonateClient'), {
    ssr: false,
});

export default function DonatePage() {
    return <DonateClient />;
}

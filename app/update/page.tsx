'use client'
import React from 'react';
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Update() {
    const [data, setData] = useState<{open: null} | {open: "true"} | {open: "false"}>({open: null});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/coupons');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`container text-center ${data.open ? data.open === "true" ? "open" : "close" : "loading"}`}>
            <h1>現在の社会の窓</h1>
            <p className="status">{data.open ? data.open === "true" ? "開" : "閉" : "👀"}</p>
        </div>
    );
}
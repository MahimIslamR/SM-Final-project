import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Blog = () => {
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('recentlyViewed') || '[]';
            const parsed = JSON.parse(raw);
            setRecent(parsed);
        } catch (e) {
            setRecent([]);
        }
    }, []);

    const clearHistory = () => {
        localStorage.removeItem('recentlyViewed');
        setRecent([]);
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold mb-6">Blog</h1>

            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-medium">Recently Viewed</h2>
                    <button onClick={clearHistory} className="btn btn-sm">Clear</button>
                </div>

                {recent.length === 0 ? (
                    <p className="text-gray-500">You have not viewed any products yet.</p>
                ) : (
                    <div className="grid grid-cols-4 gap-6">
                        {recent.map(item => (
                            <Link key={item.id} to={`/shop/${item.id}`} className="border rounded-md p-3 hover:shadow">
                                <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded" />
                                <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                                <p className="text-gray-600">${item.price}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-medium mb-2">Blog posts</h2>
                <p className="text-gray-600">(This area can be used for blog content.)</p>
            </section>
        </div>
    );
};

export default Blog;
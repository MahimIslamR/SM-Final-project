import React, { useEffect } from 'react';
import useData from '../../Hooks/useData';
import { useParams } from 'react-router';
import { FaStar } from 'react-icons/fa';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';

const SingleProductPage = () => {
    const { id } = useParams()
    const { products } = useData()
    const findProducts = products.find(p => p.id == id)
    
    useEffect(() => {
        if (!findProducts) return;
        try {
            const item = {
                id: findProducts.id,
                name: findProducts.name,
                price: findProducts.price,
                image: findProducts.image
            };
            const raw = localStorage.getItem('recentlyViewed') || '[]';
            const list = JSON.parse(raw);
            // remove any existing with same id
            const filtered = list.filter(i => i.id != item.id);
            filtered.unshift(item);
            const limited = filtered.slice(0, 10);
            localStorage.setItem('recentlyViewed', JSON.stringify(limited));
        } catch (e) {
            // ignore storage errors
        }
    }, [findProducts]);
    return (
        <div>
            <div>
                <div className='flex items-center gap-8 my-12 justify-center'>
                    <img className='w-120 rounded-md' src={findProducts?.image} alt="" />
                    <div>
                        <p className='ts'>{findProducts?.categoryName}</p>
                        <h3 className='text-4xl font-semibold'>{findProducts?.name}</h3>
                        <div className='flex items-center gap-12'>

                            <div className='flex gap-1 py-2 text-orange-500'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div>
                                <p className='ts'>Total Rating : {findProducts?.ratings}</p>
                            </div>

                        </div>
                        <div className='flex gap-4 text-2xl '>
                            <p>Price : $ {findProducts?.price}</p>
                            <p className='line-through text-gray-400'>$ {findProducts?.mrp}</p>
                        </div>
                        <div>
                            <p className='ts mb-4'>{findProducts?.description}</p>
                            <p className='font-semibold'>SKU : <span className='font-normal text-gray-600'>{findProducts?.sku}</span></p>
                            <p className='font-semibold'>Stock: <span className='font-normal text-gray-600'>{findProducts?.stock}</span></p>
                            <p className='font-semibold'>Closure : <span className='font-normal text-gray-600'>{findProducts?.closure}</span></p>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='font-semibold mr-3 my-4'>Size : </p>
                            {findProducts?.weightOptions.map(w => (
                                <div>
                                    <p ><span className='font-normal text-gray-600 btn btn-xs'>{w}</span></p>
                                </div>
                            ))}
                        </div>
                        <div className='flex gap-2 my-4'>
                            <div className='flex gap-4 border border-gray-200 px-8 py-2 rounded-md'>
                                <p>-</p>
                                <p>1</p>
                                <p>+</p>
                            </div>
                            <div>
                                <button className='btn bgp text-gray-100'>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-24'>
                <SectionHeading heading={"Top Rted"} colorHeading={"Seleing Products"} discription={"High-quality denim jeans for men with a comfortable"}></SectionHeading>
                <div className='grid grid-cols-5 my-12'>
                    {
                        products.slice(0,5).map(p => <ProductCard product={p}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
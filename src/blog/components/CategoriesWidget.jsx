import React from 'react'

const CategoriesWidget = () => {
    return (
        <div class="aside-widget">
            <div class="section-title">
                <h2>Catagories</h2>
            </div>
            <div class="category-widget">
                <ul>
                    <li><a href="#" class="cat-1">Web Design<span>340</span></a></li>
                    <li><a href="#" class="cat-2">JavaScript<span>74</span></a></li>
                    <li><a href="#" class="cat-4">JQuery<span>41</span></a></li>
                    <li><a href="#" class="cat-3">CSS<span>35</span></a></li>
                </ul>
            </div>
        </div>
    )
}

export default CategoriesWidget;
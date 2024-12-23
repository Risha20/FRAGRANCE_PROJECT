document.addEventListener('DOMContentLoaded', function () {
    const sortFilter = document.getElementById('sort-filter');
    const dealsFilter = document.getElementById('deals-filter');
    const brandFilter = document.getElementById('brand-filter');
    const searchName = document.getElementById('search-name');

    function updateProducts() {
        const sort = sortFilter.value;
        const deals = dealsFilter.value;
        const brand = brandFilter.value; 
        const search = searchName.value;
        const category = document.querySelector('#products-container').dataset.category;
        $.ajax({
            url: `/shop/${category}/?sort=${sort}&sale=${deals}&brand=${brand}&search=${encodeURIComponent(search)}`,
            method : "GET",
            success:(data)=>{
                const container = document.getElementById('products-container');
                container.innerHTML = '';

            
                data.fragrance.forEach(frag => {
                    const productHTML = `
                        <div class="col">
                            <div class="card" style="width: 18rem;">
                                <img src="${frag.img}" class="card-img-top" alt="${frag.name}">
                                <div class="card-body">
                                    <h5 class="card-brand">${frag.brand}</h5>
                                    <h5 class="card-title">${frag.name}</h5>
                                    ${
                                        frag.isOnSale
                                            ? `<p class="card-text"><span style="text-decoration: line-through;">$${frag.price}</span>
                                                <span style="color: red;">$${frag.salePrice}</span></p>`
                                            : `<p class="card-text">$${frag.price}</p>`
                                    }
                                    <a href="#" class="btn btn-primary">Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', productHTML);
                });
            },
            error: (error) => {
                console.error('There is an error when fetching products:', error);
                alert('Failed to fetch products. Please try again.');
            }

        })
    }

    sortFilter.addEventListener('change', updateProducts);
    dealsFilter.addEventListener('change', updateProducts);
    brandFilter.addEventListener('change', updateProducts);
    searchName.addEventListener('input', updateProducts);
});

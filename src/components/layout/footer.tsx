
export default function Footer() {

    const usefulLinks = [
        ["About", "Careers", "Blogs", "Press", "Lead", "Value"],
        ["Privacy", "Terms", "FAQ’s", "Security", "Mobile", "Contact"],
        ["Partner", "Franchise", "Seller", "Warehouse", "Resources", "Deliver"]
    ];

    const categories = new Array(15).fill("Vegetable & Fruits");

    return (
        <footer className="bg-secondary py-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                {/* ------------------------------ useful Links ------------------------------ */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Useful Links</h2>
                    <div className="grid grid-cols-3 gap-4 text-secondary-foreground">
                        {usefulLinks.map((column, index) => (
                            <ul key={index} className="space-y-2">
                                {column.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:underline">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>

                {/* ------------------------------ Categories ------------------------------ */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Categories</h2>
                    <div className="grid grid-cols-3 gap-4 text-gray-600">
                        {categories.map((category, index) => (
                            <span key={index} className="block">{category}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

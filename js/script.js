// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (window.innerWidth <= 768) {
        document.querySelector('.logo').after(hamburger);
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Handle category selection from homepage
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (categoryFilter && category) {
        categoryFilter.value = category;
        handleFilters();
    }

    // Search Form Handling
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchForm.querySelector('input').value;
            if (query.trim()) {
                const results = searchScholarships(query);
                displayScholarships(results);
            }
        });

        // Handle URL parameters for search
        const searchQuery = urlParams.get('query');
        if (searchQuery) {
            searchForm.querySelector('input').value = searchQuery;
            const results = searchScholarships(searchQuery);
            displayScholarships(results);
        }
    }

    // Initialize filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilters);
        // Initial display of all scholarships
        displayScholarships(scholarships);
    }

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Add smooth scroll animation for the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });
    }
});

// Scholarship data
const scholarships = [
    // Merit-Based Scholarships
    {
        title: "KVPY – Kishore Vaigyanik Protsahan Yojana",
        category: "merit",
        amount: "₹5,000-7,000/month",
        description: "For Class 11, 12 & undergraduate students in basic sciences",
        details: {
            eligibility: "Class 11, 12 & 1st-year B.Sc/BS/B.Stat/B.Math students",
            support: "₹5,000/month (1st-3rd year), ₹7,000/month (4th-5th year)",
            contingency: "₹20,000-28,000 per annum",
            deadline: "July/August",
            notes: "10% marks relaxation for SC/ST/PWD candidates"
        }
    },
    {
        title: "NTSE Scholarship",
        category: "merit",
        amount: "₹1,250-2,000/month",
        description: "For Class 10 students in recognized schools",
        details: {
            eligibility: "Class 10 students, including ODL",
            support: "₹1,250/month (Class 11-12), ₹2,000/month (UG & PG)",
            phd: "As per UGC norms",
            deadline: "September",
            beneficiaries: "Around 1,000 scholarships annually"
        }
    },
    {
        title: "Swami Vivekananda Merit cum Means Scholarship",
        category: "merit",
        amount: "Up to ₹8,000/month",
        description: "For minority community students in West Bengal",
        details: {
            eligibility: "75% in Class 10 & 12, family income below ₹2.5 Lakh",
            region: "West Bengal students only",
            deadline: "November",
            requirement: "53% in general or 55% in engineering"
        }
    },
    // Need-Based Scholarships
    {
        title: "HDFC Bank Parivartan's ECSS Programme",
        category: "need",
        amount: "Up to ₹50,000/year",
        description: "For economically disadvantaged students",
        details: {
            coverage: "School education and undergraduate studies",
            expenses: "Tuition fees, books, and educational expenses",
            eligibility: "Based on family income threshold"
        }
    },
    {
        title: "National Fellowship for ST Students",
        category: "need",
        amount: "₹25,000-28,000/month",
        description: "For ST students pursuing higher education",
        details: {
            support: "₹25,000 (UG/PG), ₹28,000 (PhD)",
            coverage: "Tuition, living, and academic expenses",
            scope: "National and international institutions"
        }
    },
    {
        title: "Central Sector Scheme Scholarships",
        category: "need",
        amount: "₹10,000-20,000/year",
        description: "For post-secondary education students",
        details: {
            eligibility: "Family income below ₹8 lakh annually",
            support: "₹10,000 (UG), ₹20,000 (PG)",
            coverage: "Tuition fees and academic costs"
        }
    },
    // Sports-Based Scholarships
    {
        title: "DXC Progressing Minds Scholarship",
        category: "sports",
        amount: "Varies",
        description: "For athletes from marginalized communities",
        details: {
            eligibility: "Women, transgender, marginalized communities",
            age: "13-25 years",
            requirement: "State/national level representation",
            focus: "STEM courses"
        }
    },
    {
        title: "Anjum Chopra Sports Scholarship",
        category: "sports",
        amount: "Varies",
        description: "For female athletes in India",
        details: {
            coverage: "Training and competition expenses",
            focus: "Women's sports empowerment",
            support: "Cash prize and training support"
        }
    },
    {
        title: "GoSports Foundation Athlete Scholarships",
        category: "sports",
        amount: "Up to ₹6 Lakh/year",
        description: "For national/international level athletes",
        details: {
            coverage: "Training expenses",
            sports: "Badminton, shooting, tennis, etc.",
            support: "Mentorship and career guidance"
        }
    },
    // International Scholarships
    {
        title: "Turkiye Scholarships 2025",
        category: "international",
        amount: "4,500-9,000 TL/month",
        description: "For international students studying in Turkey",
        details: {
            stipend: "4,500-9,000 TL monthly based on level",
            coverage: "Tuition, accommodation, health insurance",
            additional: "Flight tickets and language course",
            requirement: "No mandatory Turkish proficiency"
        }
    },
    {
        title: "TWAS-CNPq Postgraduate Fellowship",
        category: "international",
        amount: "BRL 3,100/month",
        description: "For developing countries' graduates",
        details: {
            eligibility: "Master's in natural sciences",
            language: "Portuguese, Spanish, or English",
            support: "Travel and visa assistance",
            requirement: "Must return to home country"
        }
    },
    {
        title: "Think Big Postgraduate Scholarship",
        category: "international",
        amount: "Up to GBP 13,000",
        description: "For University of Bristol postgraduates",
        details: {
            coverage: "Tuition fees",
            additional: "Up to GBP 3,000 bursary",
            exclusions: "Medicine, Dentistry, Veterinary",
            requirement: "Overseas student status"
        }
    }
];

function searchScholarships(query) {
    query = query.toLowerCase();
    return scholarships.filter(scholarship => 
        scholarship.title.toLowerCase().includes(query) ||
        scholarship.category.toLowerCase().includes(query) ||
        scholarship.description.toLowerCase().includes(query) ||
        scholarship.amount.toLowerCase().includes(query) ||
        Object.values(scholarship.details).some(detail => 
            detail.toString().toLowerCase().includes(query)
        )
    );
}

function displayScholarships(results) {
    const container = document.querySelector('.scholarship-cards');
    if (!container) return;

    container.innerHTML = results.map(scholarship => `
        <div class="scholarship-card">
            <i class="fas ${getCategoryIcon(scholarship.category)}"></i>
            <h3>${scholarship.title}</h3>
            <p>${scholarship.description}</p>
            <span class="scholarship-amount">${scholarship.amount}</span>
            <div class="scholarship-details">
                ${Object.entries(scholarship.details).map(([key, value]) => `
                    <p><strong>${formatKey(key)}:</strong> ${value}</p>
                `).join('')}
            </div>
            <a href="${getApplicationUrl(scholarship.title)}" class="btn-secondary">
                Apply Now
            </a>
        </div>
    `).join('');
}

function getApplicationUrl(title) {
    const urlMap = {
        "KVPY – Kishore Vaigyanik Protsahan Yojana": "kvpy-application.html",
        "NTSE Scholarship": "ntse-application.html",
        "Swami Vivekananda Merit cum Means Scholarship": "swami-vivekananda-application.html",
        "HDFC Bank Parivartan's ECSS Programme": "hdfc-application.html",
        "National Fellowship for ST Students": "st-fellowship-application.html",
        "Central Sector Scheme Scholarships": "central-sector-application.html",
        "DXC Progressing Minds Scholarship": "dxc-application.html",
        "Anjum Chopra Sports Scholarship": "anjum-chopra-application.html",
        "GoSports Foundation Athlete Scholarships": "gosports-application.html",
        "Turkiye Scholarships 2025": "turkiye-application.html",
        "TWAS-CNPq Postgraduate Fellowship": "twas-cnpq-application.html",
        "Think Big Postgraduate Scholarship": "think-big-application.html"
    };
    
    return urlMap[title] || "#";
}

function formatKey(key) {
    return key.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getCategoryIcon(category) {
    const icons = {
        merit: 'fa-graduation-cap',
        need: 'fa-hand-holding-heart',
        sports: 'fa-running',
        international: 'fa-globe'
    };
    return icons[category] || 'fa-graduation-cap';
}

function handleFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    let filtered = [...scholarships];
    
    const category = categoryFilter.value;
    if (category) {
        filtered = filtered.filter(s => s.category === category);
    }

    displayScholarships(filtered);
}
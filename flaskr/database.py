
db = {
    "advisors": {
        "advisor_1": {
            # Authentication & UI Data
            "password": "password123", 
            "name": "Alex Advisor", 
            "cpd_points": 25,
            
            # Contact Details
            "phone_number": "+1-555-0102",
            "email": "alex@aag.com",
            
            # Leaderboard & Performance Metrics
            "new_clients_signed": 12, 
            "initial_consultations_held": 45, 
            "closed_cases": 10, 
            "dollar_volume": 1500000 
        },
        "advisor_2": {
            "password": "password123", 
            "name": "Sarah Jenkins", 
            "cpd_points": 30,
            "phone_number": "+1-555-0103",
            "email": "sarah@aag.com",
            "new_clients_signed": 28, 
            "initial_consultations_held": 60, 
            "closed_cases": 25, 
            "dollar_volume": 4200000 
        }
    },
    
    # We are adding the Clients table here so your AI logic has real data to pull from
    "clients": {
        "client_A": {
            "name": "Acme Logistics Corp",
            "company_description": "A mid-sized logistics and freight forwarding firm expanding into cross-border operations.",
            "requirements": "Needs tax structuring advice for new international warehouses and equipment financing."
        },
        "client_B": {
            "name": "TechFlow Startup",
            "company_description": "15 employees, series A funded SaaS company.",
            "requirements": "Looking to set up an employee 401k match program and key-person insurance."
        }
    }
}
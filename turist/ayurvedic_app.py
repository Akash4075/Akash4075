import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk

# Sample plant info dictionary (you can expand this)
plants_info = {
    "Ashwagandha": {
        "info": "A powerful adaptogen that boosts strength and reduces stress.\nUsed in stress relief, immunity boosting, and male vitality."
    },
    "Tulsi": {
        "info": "Sacred plant with anti-bacterial and adaptogenic properties.\nUsed for cold, cough, fever, and respiratory issues."
    },
    "Amla": {
        "info": "Rich in Vitamin C and antioxidants.\nUsed to boost immunity, hair health, and digestion."
    },
    # Add more plants...
}

# Health problem keywords mapped to Ayurvedic plant names
health_solutions = {
    "stress": "Ashwagandha",
    "anxiety": "Ashwagandha",
    "cold": "Tulsi",
    "cough": "Tulsi",
    "fever": "Tulsi",
    "immunity": "Amla",
    "digestion": "Amla",
    "hair": "Amla",
    # Add more keyword-to-plant mappings
}

# Background image path
bg_image_path = "images/background.jpg"

def show_welcome_screen(root):
    for widget in root.winfo_children():
        widget.destroy()

    try:
        bg = Image.open(bg_image_path)
        bg = bg.resize((900, 600))
        bg_img = ImageTk.PhotoImage(bg)
        bg_label = tk.Label(root, image=bg_img)
        bg_label.image = bg_img
        bg_label.place(x=0, y=0, relwidth=1, relheight=1)
    except:
        root.config(bg="lightgreen")

    tk.Label(root, text="Adichunchanagiri Healthcare", font=("Helvetica", 24, "bold"), fg="black", bg="lightgreen").pack(pady=30)
    tk.Label(root, text="🌿✨ Jai Shree Guru Dev!", font=("Helvetica", 16), bg="lightgreen", fg="darkgreen").pack(pady=(0, 20))

    for tip in [
        "🌿 Drink warm water infused with tulsi leaves daily.",
        "🌿 Include turmeric in your meals for immunity.",
        "🌿 Start your day with Triphala powder for digestion.",
        "🌿 Use neem paste to purify skin naturally."
    ]:
        tk.Label(root, text=tip, font=("Helvetica", 12), bg="lightgreen").pack()

    lang_var = tk.StringVar(value="English")
    tk.Label(root, text="Select Language:", font=("Helvetica", 14), bg="lightgreen").pack(pady=(30, 5))
    ttk.Combobox(root, textvariable=lang_var, values=["English", "Hindi", "Kannada"], state="readonly").pack()

    tk.Button(root, text="Next", font=("Helvetica", 14, "bold"), bg="darkgreen", fg="white",
              command=lambda: show_plants_screen(root, lang_var.get())).pack(pady=20)

    # "How can I help you?" button
    tk.Button(root, text="How can I help you?", font=("Helvetica", 12), bg="#007a5e", fg="white",
              command=lambda: show_health_input_screen(root)).pack(pady=10)

def show_health_input_screen(root):
    for widget in root.winfo_children():
        widget.destroy()

    root.config(bg="#eaffea")
    tk.Label(root, text="How can I help you?", font=("Helvetica", 20, "bold"), bg="#eaffea", fg="darkgreen").pack(pady=30)
    
    tk.Label(root, text="Please describe your health problem below:", font=("Helvetica", 12), bg="#eaffea").pack(pady=5)
    
    input_box = tk.Text(root, font=("Helvetica", 12), width=70, height=5)
    input_box.pack(pady=10)

    def get_solution():
        user_input = input_box.get("1.0", "end").strip().lower()
        found_plant = None
        for keyword, plant in health_solutions.items():
            if keyword in user_input:
                found_plant = plant
                break
        
        if found_plant:
            show_plant_details(root, found_plant)
        else:
            messagebox.showinfo("No Match", "Sorry, no Ayurvedic solution found for your input.")

    tk.Button(root, text="Get Ayurvedic Suggestion", font=("Helvetica", 12, "bold"), bg="darkgreen", fg="white",
              command=get_solution).pack(pady=10)

    nav_frame = tk.Frame(root, bg="#eaffea")
    nav_frame.pack(pady=10)
    tk.Button(nav_frame, text="Back", font=("Helvetica", 12), command=lambda: show_welcome_screen(root)).pack(side="left", padx=10)
    tk.Button(nav_frame, text="Home", font=("Helvetica", 12), command=lambda: show_welcome_screen(root)).pack(side="left", padx=10)

def show_plants_screen(root, language):
    for widget in root.winfo_children():
        widget.destroy()

    root.config(bg="#d0f0c0")
    tk.Label(root, text="Hi there - Know about Ayurvedic Plants", font=("Helvetica", 20, "bold"), bg="#d0f0c0", fg="black").pack(pady=20)

    search_var = tk.StringVar()
    search_frame = tk.Frame(root, bg="#d0f0c0")
    search_frame.pack()
    tk.Entry(search_frame, textvariable=search_var, font=("Helvetica", 12), width=40).pack(side="left", padx=10)
    tk.Button(search_frame, text="Search", font=("Helvetica", 12),
              command=lambda: search_plant(root, search_var.get())).pack(side="left")

    plant_frame = tk.Frame(root, bg="#d0f0c0")
    plant_frame.pack(fill="both", expand=True)
    canvas = tk.Canvas(plant_frame, bg="#d0f0c0")
    scrollbar = ttk.Scrollbar(plant_frame, orient="vertical", command=canvas.yview)
    scrollable_frame = tk.Frame(canvas, bg="#d0f0c0")

    scrollable_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
    canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
    canvas.configure(yscrollcommand=scrollbar.set)
    canvas.pack(side="left", fill="both", expand=True)
    scrollbar.pack(side="right", fill="y")

    for plant in plants_info:
        tk.Button(scrollable_frame, text=plant, font=("Helvetica", 12), width=50,
                  command=lambda p=plant: show_plant_details(root, p)).pack(pady=2)

    nav_frame = tk.Frame(root, bg="#d0f0c0")
    nav_frame.pack(pady=10)
    tk.Button(nav_frame, text="Back", font=("Helvetica", 12), command=lambda: show_welcome_screen(root)).pack(side="left", padx=10)
    tk.Button(nav_frame, text="Home", font=("Helvetica", 12), command=lambda: show_welcome_screen(root)).pack(side="left", padx=10)

def show_plant_details(root, plant_name):
    for widget in root.winfo_children():
        widget.destroy()

    root.config(bg="white")
    info = plants_info.get(plant_name, {}).get("info", "Information not available")

    tk.Label(root, text=plant_name, font=("Helvetica", 20, "bold"), fg="darkgreen", bg="white").pack(pady=20)
    text = tk.Text(root, wrap="word", font=("Helvetica", 12), width=80, height=15, bg="white")
    text.insert("1.0", info)
    text.config(state="disabled")
    text.pack(pady=10)

    nav_frame = tk.Frame(root, bg="white")
    nav_frame.pack(pady=10)
    tk.Button(nav_frame, text="Back", font=("Helvetica", 12), command=lambda: show_plants_screen(root, "English")).pack(side="left", padx=10)
    tk.Button(nav_frame, text="Home", font=("Helvetica", 12), command=lambda: show_welcome_screen(root)).pack(side="left", padx=10)

def search_plant(root, query):
    q = query.strip().capitalize()
    if q in plants_info:
        show_plant_details(root, q)
    else:
        messagebox.showinfo("Not Found", f"No information available for '{query}'")

# Run the app
if __name__ == "__main__":
    root = tk.Tk()
    root.title("Ayurvedic App")
    root.geometry("900x600")
    show_welcome_screen(root)
    root.mainloop()

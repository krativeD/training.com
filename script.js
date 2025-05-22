document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Booking modal functionality
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModalBtns = document.querySelectorAll('.close-btn');
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
    
    // Open booking modal
    bookNowBtn.addEventListener('click', function() {
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    closeSuccessModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('bookingEmail').value,
            phone: document.getElementById('phone').value,
            sessionType: document.getElementById('sessionType').value,
            date: document.getElementById('sessionDate').value,
            time: document.getElementById('sessionTime').value,
            notes: document.getElementById('notes').value
        };
        
        // Send email using SMTPJS
        Email.send({
            SecureToken: "fe605f0a-f4e1-41f9-8040-e39ec58011ce", // You need to get this from SMTPJS.com
            To: 'kratived25@gmail.com',
            From: 'kratived25@gmail.com',
            Subject: `New Training Booking - ${formData.name}`,
            Body: `
                <h2>New Training Session Booking</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Session Type:</strong> ${formData.sessionType}</p>
                <p><strong>Date:</strong> ${formData.date}</p>
                <p><strong>Time:</strong> ${formData.time}</p>
                <p><strong>Additional Notes:</strong> ${formData.notes || 'None'}</p>
            `
        }).then(
            message => {
                console.log(message);
                // Show success modal
                bookingModal.style.display = 'none';
                successModal.style.display = 'block';
                
                // Reset form
                bookingForm.reset();
            }
        ).catch(
            error => {
                console.error('Error sending email:', error);
                alert('There was an error submitting your booking. Please try again or contact us directly.');
            }
        );
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const contactData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            Email.send({
                SecureToken: "fe605f0a-f4e1-41f9-8040-e39ec58011ce", // You need to get this from SMTPJS.com
                To: 'kratived25@gmail.com',
                From: 'kratived25@gmail.com',
                Subject: `New Contact Message - ${contactData.name}`,
                Body: `
                    <h2>New Contact Message</h2>
                    <p><strong>Name:</strong> ${contactData.name}</p>
                    <p><strong>Email:</strong> ${contactData.email}</p>
                    <p><strong>Message:</strong> ${contactData.message}</p>
                `
            }).then(
                message => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                }
            ).catch(
                error => {
                    console.error('Error sending email:', error);
                    alert('There was an error sending your message. Please try again later.');
                }
            );
        });
    }
    
    // Set minimum date for booking to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('sessionDate').min = today;
});
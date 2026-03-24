from django.core.management.base import BaseCommand
from projects.models import Project

PROJECTS_DATA = [
    {
        'title': 'WealthTrack',
        'category': 'Finance',
        'subtitle': 'Budget, Savings & Investment Tracker',
        'description': 'Take full control of your money with WealthTrack — set budgets, track daily expenses, monitor investments, and get AI-powered insights to grow your wealth faster.',
        'rating': '4.8', 'rating_count': '21K', 'rank': '#2', 'size': '44.6 MB', 'version': '2.4.1',
    },
    {
        'title': 'FitSync Pro',
        'category': 'Health',
        'subtitle': 'Workout Plans & Nutrition Coach',
        'description': 'FitSync Pro turns your phone into a personal trainer — log workouts, track calories, follow guided training programs, and sync with your wearables in real time.',
        'rating': '4.7', 'rating_count': '14K', 'rank': '#3', 'size': '52.1 MB', 'version': '3.2.0',
    },
    {
        'title': 'ConnectMe',
        'category': 'Social',
        'subtitle': 'Community Messaging & Groups',
        'description': 'ConnectMe brings people together through fast messaging, interest-based communities, and live events — all in a clean, distraction-free interface.',
        'rating': '4.6', 'rating_count': '38K', 'rank': '#5', 'size': '61.3 MB', 'version': '4.0.2',
    },
    {
        'title': 'ShopEase',
        'category': 'E-Commerce',
        'subtitle': 'Smart Shopping & Instant Checkout',
        'description': 'Discover the best deals, compare prices across stores, and check out in seconds with ShopEase — your all-in-one shopping companion with real-time order tracking.',
        'rating': '4.7', 'rating_count': '18K', 'rank': '#4', 'size': '48.9 MB', 'version': '2.7.3',
    },
    {
        'title': 'QuickTools',
        'category': 'Utility',
        'subtitle': '40+ Everyday Utility Tools',
        'description': 'Replace 10 apps with one. QuickTools packs a QR scanner, PDF converter, unit converter, currency calculator, file compressor, and 35+ more tools in a single clean app.',
        'rating': '4.8', 'rating_count': '9K', 'rank': '#1', 'size': '38.4 MB', 'version': '1.9.5',
    },
    {
        'title': 'LearnHub',
        'category': 'Education',
        'subtitle': 'Online Courses & Skill Certificates',
        'description': 'LearnHub connects learners with expert-led courses across tech, design, business, and language — with bite-sized lessons, live quizzes, and shareable certificates.',
        'rating': '4.9', 'rating_count': '11K', 'rank': '#2', 'size': '35.7 MB', 'version': '2.1.0',
    },
    {
        'title': 'PlayZone',
        'category': 'Game',
        'subtitle': 'Casual & Puzzle Games Collection',
        'description': 'PlayZone is your go-to gaming hub — 50+ casual, puzzle, and arcade games with offline support, daily challenges, and leaderboards to compete with friends.',
        'rating': '4.5', 'rating_count': '62K', 'rank': '#7', 'size': '74.2 MB', 'version': '1.6.4',
    },
    {
        'title': 'TaskFlow',
        'category': 'Productivity',
        'subtitle': 'To-Do Lists, Projects & Focus Timer',
        'description': 'TaskFlow keeps your day on track — organize tasks into projects, set deadlines, collaborate with teammates, and stay focused using the built-in Pomodoro timer.',
        'rating': '4.8', 'rating_count': '16K', 'rank': '#1', 'size': '29.8 MB', 'version': '3.5.1',
    },
    {
        'title': 'TripPlanner',
        'category': 'Travel',
        'subtitle': 'Travel Itineraries & Offline Maps',
        'description': 'Plan every detail of your next adventure with TripPlanner — build day-by-day itineraries, save places offline, track flights in real time, and discover hidden gems nearby.',
        'rating': '4.7', 'rating_count': '7K', 'rank': '#4', 'size': '58.3 MB', 'version': '2.3.2',
    },
    {
        'title': 'BeautyBook',
        'category': 'Lifestyle',
        'subtitle': 'Salon Booking & Beauty Trends',
        'description': 'BeautyBook connects you with top salons, spas, and freelance artists near you — browse portfolios, book appointments instantly, and track your beauty routine in one elegant app.',
        'rating': '4.9', 'rating_count': '24K', 'rank': '#1', 'size': '43.1 MB', 'version': '2.0.6',
    },
    {
        'title': 'BeatBox',
        'category': 'Music',
        'subtitle': 'Music Player, Creator & Studio',
        'description': 'BeatBox is built for music lovers and creators — stream millions of tracks in hi-fi quality, build smart playlists, and record your own beats with the built-in studio mixer.',
        'rating': '4.8', 'rating_count': '33K', 'rank': '#3', 'size': '67.5 MB', 'version': '3.1.0',
    },
    {
        'title': 'NewsDaily',
        'category': 'News',
        'subtitle': 'AI-Curated News Without the Noise',
        'description': 'NewsDaily learns what matters to you — delivering credible, bias-flagged articles from 500+ trusted sources with zero clickbait, ad-free reading, and offline access.',
        'rating': '4.6', 'rating_count': '8K', 'rank': '#6', 'size': '31.2 MB', 'version': '1.4.3',
    },
]


class Command(BaseCommand):
    help = 'Seed initial project data into the database'

    def handle(self, *args, **options):
        created_count = 0
        for i, data in enumerate(PROJECTS_DATA):
            project, created = Project.objects.get_or_create(
                title=data['title'],
                defaults={
                    'category': data['category'],
                    'subtitle': data['subtitle'],
                    'description': data['description'],
                    'rating': data['rating'],
                    'rating_count': data['rating_count'],
                    'rank': data['rank'],
                    'rank_category': data['category'],
                    'developer': '68 Media Co.',
                    'size': data['size'],
                    'version': data['version'],
                    'language': 'English',
                    'age': '4+',
                    'order': i,
                }
            )
            if created:
                created_count += 1
                self.stdout.write(f'  Created: {project.title}')
            else:
                self.stdout.write(f'  Skipped (exists): {project.title}')

        self.stdout.write(self.style.SUCCESS(f'\nDone. {created_count} projects created.'))

from django.core.management.base import BaseCommand
from projects.models import Project

PROJECTS_DATA = [
    {
        'title': 'WealthTrack',
        'category': 'Finance',
        'description': 'A smart personal finance app that helps you manage budgets, track expenses, and grow your savings with AI-powered insights.',
        'rating': '4.8', 'rating_count': '12K', 'rank': '#2', 'size': '42.3 MB', 'version': '2.4.1',
    },
    {
        'title': 'FitSync Pro',
        'category': 'Health',
        'description': 'Your complete fitness companion — track workouts, monitor nutrition, and reach your health goals faster with personalized plans.',
        'rating': '4.7', 'rating_count': '8K', 'rank': '#4', 'size': '38.7 MB', 'version': '1.8.3',
    },
    {
        'title': 'ConnectMe',
        'category': 'Social',
        'description': 'A modern social platform designed to bring communities together through meaningful conversations and shared experiences.',
        'rating': '4.9', 'rating_count': '24K', 'rank': '#1', 'size': '55.2 MB', 'version': '3.1.0',
    },
    {
        'title': 'ShopEase',
        'category': 'E-Commerce',
        'description': 'Seamless shopping experience with smart recommendations, one-tap checkout, and real-time order tracking.',
        'rating': '4.6', 'rating_count': '6K', 'rank': '#5', 'size': '44.1 MB', 'version': '2.2.5',
    },
    {
        'title': 'QuickTools',
        'category': 'Utility',
        'description': 'An all-in-one utility suite with 30+ essential tools — converter, scanner, calculator, and more in one clean interface.',
        'rating': '4.8', 'rating_count': '15K', 'rank': '#3', 'size': '62.8 MB', 'version': '1.5.2',
    },
    {
        'title': 'LearnHub',
        'category': 'Education',
        'description': 'Interactive learning platform offering courses, quizzes, and progress tracking for students and lifelong learners.',
        'rating': '4.7', 'rating_count': '9K', 'rank': '#6', 'size': '35.4 MB', 'version': '2.9.1',
    },
    {
        'title': 'PlayZone',
        'category': 'Game',
        'description': 'A collection of casual games engineered for smooth performance and addictive gameplay on any device.',
        'rating': '4.9', 'rating_count': '18K', 'rank': '#1', 'size': '48.9 MB', 'version': '1.3.7',
    },
    {
        'title': 'TaskFlow',
        'category': 'Productivity',
        'description': 'Streamline your day with smart task management, team collaboration, and deadline reminders in one focused workspace.',
        'rating': '4.8', 'rating_count': '11K', 'rank': '#2', 'size': '41.6 MB', 'version': '3.0.2',
    },
    {
        'title': 'TripPlanner',
        'category': 'Travel',
        'description': 'Plan your perfect trip with smart itineraries, offline maps, local recommendations, and real-time flight tracking.',
        'rating': '4.6', 'rating_count': '7K', 'rank': '#7', 'size': '33.2 MB', 'version': '2.1.4',
    },
    {
        'title': 'BeautyBook',
        'category': 'Lifestyle',
        'description': 'Book salon appointments, discover beauty trends, and manage your self-care routines — all in one elegant app.',
        'rating': '4.7', 'rating_count': '13K', 'rank': '#3', 'size': '57.3 MB', 'version': '1.7.8',
    },
    {
        'title': 'BeatBox',
        'category': 'Music',
        'description': 'Stream, create, and share music with high-fidelity audio, smart playlists, and a built-in beat maker studio.',
        'rating': '4.8', 'rating_count': '20K', 'rank': '#1', 'size': '46.5 MB', 'version': '2.6.3',
    },
    {
        'title': 'NewsDaily',
        'category': 'News',
        'description': 'Stay informed with AI-curated news from trusted sources, personalized to your interests with zero clickbait.',
        'rating': '4.9', 'rating_count': '5K', 'rank': '#4', 'size': '39.8 MB', 'version': '3.2.1',
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
                    'description': data['description'],
                    'subtitle': f"{data['category']} & Productivity",
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

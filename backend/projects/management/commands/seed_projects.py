from django.core.management.base import BaseCommand
from projects.models import Project


def u(photo_id):
    return f'https://images.unsplash.com/photo-{photo_id}?w=800&h=500&fit=crop&q=80'


PROJECTS_DATA = [
    {
        'title': 'WealthTrack', 'category': 'Finance',
        'subtitle': 'Budget, Savings & Investment Tracker',
        'description': 'Take full control of your money with WealthTrack — set budgets, track daily expenses, monitor investments, and get AI-powered insights to grow your wealth faster.',
        'rating': '4.8', 'rating_count': '21K', 'rank': '#2', 'size': '44.6 MB', 'version': '2.4.1',
        'images': [u('1611974789855-9c2a0a7236a3'), u('1554224155-6726b3ff858f'), u('1579621970563-ebec7560ff3e'), u('1563986768609-322da13575f3')],
    },
    {
        'title': 'FitSync Pro', 'category': 'Health',
        'subtitle': 'Workout Plans & Nutrition Coach',
        'description': 'FitSync Pro turns your phone into a personal trainer — log workouts, track calories, follow guided training programs, and sync with your wearables in real time.',
        'rating': '4.7', 'rating_count': '14K', 'rank': '#3', 'size': '52.1 MB', 'version': '3.2.0',
        'images': [u('1517836357463-d25dfeac3438'), u('1571019614242-c5c5dee9f50b'), u('1490645935967-10de6ba17061'), u('1476480862126-209bfaa8edc8')],
    },
    {
        'title': 'ConnectMe', 'category': 'Social',
        'subtitle': 'Community Messaging & Groups',
        'description': 'ConnectMe brings people together through fast messaging, interest-based communities, and live events — all in a clean, distraction-free interface.',
        'rating': '4.6', 'rating_count': '38K', 'rank': '#5', 'size': '61.3 MB', 'version': '4.0.2',
        'images': [u('1529156069898-49953e39b3ac'), u('1611162617213-7d7a39e9b1d7'), u('1516321318423-f06f85e504b3'), u('1543269865-cbf427effbad')],
    },
    {
        'title': 'ShopEase', 'category': 'E-Commerce',
        'subtitle': 'Smart Shopping & Instant Checkout',
        'description': 'Discover the best deals, compare prices across stores, and check out in seconds with ShopEase — your all-in-one shopping companion with real-time order tracking.',
        'rating': '4.7', 'rating_count': '18K', 'rank': '#4', 'size': '48.9 MB', 'version': '2.7.3',
        'images': [u('1472851294608-062f824d29cc'), u('1607082348824-0a96f2a4b9da'), u('1483985988355-763728e1935b'), u('1556742049-0cfed4f6a45d')],
    },
    {
        'title': 'QuickTools', 'category': 'Utility',
        'subtitle': '40+ Everyday Utility Tools',
        'description': 'Replace 10 apps with one. QuickTools packs a QR scanner, PDF converter, unit converter, currency calculator, file compressor, and 35+ more tools in a single clean app.',
        'rating': '4.8', 'rating_count': '9K', 'rank': '#1', 'size': '38.4 MB', 'version': '1.9.5',
        'images': [u('1581091226033-d5c48150dbaa'), u('1558618666-fcd25c85cd64'), u('1498050108023-c5249f4df085'), u('1526374965328-7f61d4dc18c5')],
    },
    {
        'title': 'LearnHub', 'category': 'Education',
        'subtitle': 'Online Courses & Skill Certificates',
        'description': 'LearnHub connects learners with expert-led courses across tech, design, business, and language — with bite-sized lessons, live quizzes, and shareable certificates.',
        'rating': '4.9', 'rating_count': '11K', 'rank': '#2', 'size': '35.7 MB', 'version': '2.1.0',
        'images': [u('1481627834876-b7833e8f5570'), u('1456513080510-7bf3a84b82f8'), u('1434030216411-0b793f4b4173'), u('1503676260728-1c00da094a0b')],
    },
    {
        'title': 'PlayZone', 'category': 'Game',
        'subtitle': 'Casual & Puzzle Games Collection',
        'description': 'PlayZone is your go-to gaming hub — 50+ casual, puzzle, and arcade games with offline support, daily challenges, and leaderboards to compete with friends.',
        'rating': '4.5', 'rating_count': '62K', 'rank': '#7', 'size': '74.2 MB', 'version': '1.6.4',
        'images': [u('1493711662062-fa541adb3fc8'), u('1552820728-8b83bb6b773f'), u('1560419015-7c427e8ae5ba'), u('1509198397868-475647b2a1e8')],
    },
    {
        'title': 'TaskFlow', 'category': 'Productivity',
        'subtitle': 'To-Do Lists, Projects & Focus Timer',
        'description': 'TaskFlow keeps your day on track — organize tasks into projects, set deadlines, collaborate with teammates, and stay focused using the built-in Pomodoro timer.',
        'rating': '4.8', 'rating_count': '16K', 'rank': '#1', 'size': '29.8 MB', 'version': '3.5.1',
        'images': [u('1484480974693-6ca0a78fb36b'), u('1507925921958-8a62f3d1a50d'), u('1512314889357-e157c22f938d'), u('1434626881859-194d67b2b86f')],
    },
    {
        'title': 'TripPlanner', 'category': 'Travel',
        'subtitle': 'Travel Itineraries & Offline Maps',
        'description': 'Plan every detail of your next adventure with TripPlanner — build day-by-day itineraries, save places offline, track flights in real time, and discover hidden gems nearby.',
        'rating': '4.7', 'rating_count': '7K', 'rank': '#4', 'size': '58.3 MB', 'version': '2.3.2',
        'images': [u('1506905925346-21bda4d32df4'), u('1488085061387-422e29b40080'), u('1469854523086-cc02fe5d8800'), u('1476514525535-07fb3b4ae5f1')],
    },
    {
        'title': 'BeautyBook', 'category': 'Lifestyle',
        'subtitle': 'Salon Booking & Beauty Trends',
        'description': 'BeautyBook connects you with top salons, spas, and freelance artists near you — browse portfolios, book appointments instantly, and track your beauty routine in one elegant app.',
        'rating': '4.9', 'rating_count': '24K', 'rank': '#1', 'size': '43.1 MB', 'version': '2.0.6',
        'images': [u('1522337360788-8b13dee7a37e'), u('1487412912498-0447578fcca8'), u('1560066984-138dadb4c035'), u('1571781926291-c477ebfd024b')],
    },
    {
        'title': 'BeatBox', 'category': 'Music',
        'subtitle': 'Music Player, Creator & Studio',
        'description': 'BeatBox is built for music lovers and creators — stream millions of tracks in hi-fi quality, build smart playlists, and record your own beats with the built-in studio mixer.',
        'rating': '4.8', 'rating_count': '33K', 'rank': '#3', 'size': '67.5 MB', 'version': '3.1.0',
        'images': [u('1494232410401-ad00d5433cfa'), u('1511671782779-c97d3d27a1d4'), u('1470225620780-dba8ba36b745'), u('1493225457124-a3eb161ffa5f')],
    },
    {
        'title': 'NewsDaily', 'category': 'News',
        'subtitle': 'AI-Curated News Without the Noise',
        'description': 'NewsDaily learns what matters to you — delivering credible, bias-flagged articles from 500+ trusted sources with zero clickbait, ad-free reading, and offline access.',
        'rating': '4.6', 'rating_count': '8K', 'rank': '#6', 'size': '31.2 MB', 'version': '1.4.3',
        'images': [u('1504711434969-e33886168f5c'), u('1495020689067-958852a7765e'), u('1585829365295-ab7cd400c167'), u('1526378800651-c32d170fe6f8')],
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
                    'images': data.get('images', []),
                }
            )
            if created:
                created_count += 1
                self.stdout.write(f'  Created: {project.title}')
            else:
                self.stdout.write(f'  Skipped (exists): {project.title}')

        self.stdout.write(self.style.SUCCESS(f'\nDone. {created_count} projects created.'))
